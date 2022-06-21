import { getRepository, Repository } from 'typeorm';

import { ICreateRentalsDTO } from '../../../dtos/ICreateRentalsDTO';
import { IRentalsRepository } from '../../../repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async create({
    car_id, user_id, expect_end_date, id, end_date, total,
  }: ICreateRentalsDTO): Promise<Rental> {
    const rental = await this.repository.create({
      car_id,
      user_id,
      expect_end_date,
      id,
      end_date,
      total,
    });
    await this.repository.save(rental);
    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({ where: { car_id, end_date: null } });
    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const OpenByUser = await this.repository.findOne({ where: { user_id, end_date: null } });
    return OpenByUser;
  }
  async findById(rental_id: string): Promise<Rental> {
    const rental = await this.repository.findOne(rental_id);
    return rental;
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({ where: { user_id }, relations: ['car'] });
    return rentals;
  }
}

export { RentalsRepository };
