import { getRepository, Repository } from 'typeorm';

import { ICarImagesRepository, ICreateImageDTO } from '../../../repositories/ICarImagesRepository';
import { CarImage } from '../entities/CarImage';

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create({ car_id, image_name }: ICreateImageDTO): Promise<CarImage> {
    const uploadImage = await this.repository.create({
      car_id,
      image_name,
    });
    await this.repository.save(uploadImage);
    return uploadImage;
  }
}

export { CarImagesRepository };
