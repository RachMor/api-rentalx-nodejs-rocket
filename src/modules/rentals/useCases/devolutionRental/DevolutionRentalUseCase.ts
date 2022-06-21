import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  user_id: string,
  rental_id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) { }

  async execute({ user_id, rental_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;
    if (!rental) {
      throw new AppError('Rental does not exists');
    }
    // verificar o tempo de aluguel

    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow,
    );
    if (daily <= 0) {
      daily = minimum_daily;
    }
    const delay = this.dateProvider.compareInDays(rental.expect_end_date, dateNow);
    let total = 0;
    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;
    rental.total = total;
    rental.end_date = this.dateProvider.dateNow();
    await this.carsRepository.updateAvailable(car.id, true);
    await this.rentalsRepository.create(rental);
    return rental;
  }
}

export { DevolutionRentalUseCase };
