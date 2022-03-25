import { ICreateRentalsDTO } from '../dtos/ICreateRentalsDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository{
  create({ car_id, user_id, expect_end_date }: ICreateRentalsDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;

}

export { IRentalsRepository };
