import { getRepository, Repository } from 'typeorm';

import { ISpecificationsRepository } from '../../../repositories/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

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
  async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}

export { ICreateSpecificationDTO, SpecificationsRepository };
