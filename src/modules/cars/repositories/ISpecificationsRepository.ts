import { Specification } from '../entities/Specification';
import { ICreateSpecificationDTO } from './implementations/SpecificationsRepository';

interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };
