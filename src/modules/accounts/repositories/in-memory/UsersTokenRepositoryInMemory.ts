import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../../infra/typeorm/entities/UserTokens';
import { IUsersTokenRepository } from '../IUserTokensRepository';

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  usersToken: UserTokens[] = [];
  async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
    const uToken = new UserTokens();
    Object.assign(uToken, {
      user_id,
      refresh_token,
      expires_date,
    });

    this.usersToken.push(uToken);
    return uToken;
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const uToken = this.usersToken
      .find((ut) => ut.user_id === user_id && ut.refresh_token === refresh_token);
    return uToken;
  }
  async deleteById(token_id: string): Promise<void> {
    const uToken = this.usersToken.findIndex((token) => token.id === token_id);
    this.usersToken.splice(uToken, 1);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const uToken = this.usersToken
      .find((ut) => ut.refresh_token === refresh_token);
    return uToken;
  }
}

export { UsersTokenRepositoryInMemory };
