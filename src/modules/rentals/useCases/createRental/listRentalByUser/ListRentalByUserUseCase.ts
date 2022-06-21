import { inject, injectable } from 'tsyringe';

import { Rental } from '../../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../../repositories/IRentalsRepository';

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalRepository: IRentalsRepository,
  ) { }
  async execute({ user_id }): Promise<Rental[]> {
    const rentals = await this.rentalRepository.findByUser(user_id);
    return rentals;
  }
}

export { ListRentalByUserUseCase };
