import { Specification } from '../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '../infra/typeorm/repositories/SpecificationsRepository';

interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
