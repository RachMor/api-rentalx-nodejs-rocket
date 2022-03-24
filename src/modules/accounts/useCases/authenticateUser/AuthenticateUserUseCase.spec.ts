import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user : ICreateUserDTO = {
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
      driver_license: '12345',
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase
      .execute({ email: user.email, password: user.password });
    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: 'false@gmail.com', password: 'false' });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with an incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        email: 'teste@teste.com',
        name: 'teste',
        password: 'teste',
        driver_license: '12345',
      };
      await authenticateUserUseCase.execute({ email: user.email, password: 'errado' });
    }).rejects.toBeInstanceOf(AppError);
  });
});
