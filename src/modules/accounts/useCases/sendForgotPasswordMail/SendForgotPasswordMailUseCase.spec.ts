import { jest } from '@jest/globals';

import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DaysjsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '../../repositories/in-memory/UsersTokenRepositoryInMemory';
import { SendForgotPasswordEmailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dayJsProvider,
      mailProviderInMemory,
    );
  });
  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');
    await usersRepositoryInMemory.create({
      driver_license: '349596',
      name: 'Bertie Sanchez',
      email: 'isgumnel@pamubke.bb',
      password: 'r9uvgD3K',
    });
    await sendForgotPasswordEmailUseCase.execute('isgumnel@pamubke.bb');
    expect(sendMail).toHaveBeenCalled();
  });
});
