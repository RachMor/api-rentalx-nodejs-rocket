import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DaysjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dateProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '1234',
      user_id: '121212',
      expect_end_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental if there is another open to the same car ', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '1234',
        user_id: '123',
        expect_end_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: '1234',
        user_id: '321',
        expect_end_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '321',
        user_id: '1234',
        expect_end_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
