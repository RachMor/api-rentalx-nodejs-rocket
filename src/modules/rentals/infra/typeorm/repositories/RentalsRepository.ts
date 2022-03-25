import { getRepository, Repository } from 'typeorm';

import { ICreateRentalsDTO } from '../../../dtos/ICreateRentalsDTO';
import { IRentalsRepository } from '../../../repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async create({ car_id, user_id, expect_end_date }: ICreateRentalsDTO): Promise<Rental> {
    const rental = await this.repository.create({
      car_id,
      user_id,
      expect_end_date,
    });
    await this.repository.save(rental);
    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ car_id });
    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const OpenByUser = await this.repository.findOne({ user_id });
    return OpenByUser;
  }
}

export { RentalsRepository };
