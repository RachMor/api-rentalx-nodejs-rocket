import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { IUsersTokenRepository } from '../../repositories/IUserTokensRepository';

interface IPayload{
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {

  }

  async execute(token: string): Promise<string> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;
    const userToken = await this.usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);

    if (userToken) {
      throw new Error('Refresh token does not exists!');
    }

    await this.usersTokenRepository.deleteById(userToken.id);
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });
    const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

    await this.usersTokenRepository.create({
      user_id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
