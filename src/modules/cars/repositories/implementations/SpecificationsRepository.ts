import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

interface ICreateSpecificationDTO{
  name: string;
  description: string;
}
class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
}

export { ICreateSpecificationDTO, SpecificationsRepository };
