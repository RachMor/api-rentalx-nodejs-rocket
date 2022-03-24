import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should to be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 1',
      description: 'Car description',
      daily_rate: 110.00,
      fine_amount: 40,
      license_plate: 'CAR-1111',
      brand: 'car_brand',
      category_id: 'category_id',
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toContain(car);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 2',
      description: 'Car description',
      daily_rate: 110.00,
      fine_amount: 40,
      license_plate: 'CAR-2222',
      brand: 'car_brand_test',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'car_brand_test',
    });
    expect(cars).toContain(car);
  });
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 3',
      description: 'Car description',
      daily_rate: 110.00,
      fine_amount: 40,
      license_plate: 'CAR-3333',
      brand: 'car_name_test',
      category_id: 'category_id',
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car 3',
    });
    expect(cars).toContain(car);
  });
  it('should be able to list all available cars by category_id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 4',
      description: 'Car description',
      daily_rate: 110.00,
      fine_amount: 40,
      license_plate: 'CAR-4444',
      brand: 'car_name_test',
      category_id: 'category_4444',
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category_4444',
    });
    expect(cars).toContain(car);
  });
});
