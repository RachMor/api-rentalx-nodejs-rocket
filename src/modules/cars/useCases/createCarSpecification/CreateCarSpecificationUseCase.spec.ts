import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new
    CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it('should not be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      const id = '123';
      const specifications_id = ['12345'];

      await createCarSpecificationUseCase.execute({ id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'teste',
      description: 'description_teste',
      daily_rate: 100,
      fine_amount: 40,
      license_plate: 'ABC-321',
      brand: 'brand_teste',
      category_id: 'category_teste',
    });
    const specification = await specificationsRepositoryInMemory.create({
      name: 'test',
      description: 'test',
    });
    const { id } = car;
    const specifications_id = [specification.id];

    await createCarSpecificationUseCase.execute({ id, specifications_id });
  });
});
