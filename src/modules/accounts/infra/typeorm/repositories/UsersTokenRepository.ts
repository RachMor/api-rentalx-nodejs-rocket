import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '../../../dtos/ICreateUserTokenDTO';
import { IUsersTokenRepository } from '../../../repositories/IUserTokensRepository';
import { UserTokens } from '../entities/UserTokens';

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserTokens>;
  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
    const token = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.repository.save(token);
    return token;
  }
  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.repository.findOne({ user_id, refresh_token });
  }
  async deleteById(token_id: string): Promise<void> {
    await this.repository.delete(token_id);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ refresh_token });
    console.log(userToken);
    return userToken;
  }
}

export { UsersTokenRepository };
