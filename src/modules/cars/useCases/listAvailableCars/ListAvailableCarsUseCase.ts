import { inject, injectable } from 'tsyringe';

import { IRequestDTO } from '../../dtos/IRequestDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {
  }
  async execute({ category_id, name, brand }: IRequestDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvaliable({ category_id, name, brand });
    return cars;
  }
}

export { ListAvailableCarsUseCase };
