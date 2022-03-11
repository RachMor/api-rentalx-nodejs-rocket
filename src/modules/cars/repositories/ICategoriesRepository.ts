import { Category } from '../entities/Category';
import { ICreateCategoryDTO } from './implementations/CategoriesRepository';

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository };
