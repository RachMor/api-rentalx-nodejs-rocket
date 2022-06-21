import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

interface IAvailable {
  category_id?: string
  name?: string
  brand?: string
}

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    fine_amount,
    brand,
    category_id,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      fine_amount,
      brand,
      category_id,
      license_plate,
      specifications,
      id,
    });
    this.cars.push(car);
    return car;
  }
  async findByLicensePlace(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvaliable({ brand, category_id, name }: IAvailable): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (car.available === true) {
        if (!brand && !category_id && !name) {
          return car;
        }
        if (brand && car.brand === brand) {
          return car;
        }
        if (name && car.name === name) {
          return car;
        }
        if (category_id && car.category_id === category_id) {
          return car;
        }
      }
      return null;
    });
    return cars;
  }
  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);
    return car;
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}
export { CarsRepositoryInMemory };
