import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoyInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoyInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoyInMemory);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'car',
      description: 'new car',
      daily_rate: 100,
      license_plate: 'CDE-124',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });
    expect(car).toHaveProperty('id');
  });

  it('should not to be able to create a car with exists license plate ', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'car1',
        description: 'new car',
        daily_rate: 100,
        license_plate: 'ABC-123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });
      await createCarUseCase.execute({
        name: 'car2',
        description: 'new car',
        daily_rate: 100,
        license_plate: 'ABC-123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to create a car with exists license plate ', async () => {
    const car = await createCarUseCase.execute({
      name: 'car1',
      description: 'new car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });
    expect(car.available).toBe(true);
  });
});
