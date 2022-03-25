import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICreateImageDTO{
  car_id: string;
  image_name: string;
}

interface ICarImagesRepository{
  create({ car_id, image_name }: ICreateImageDTO): Promise<CarImage>
}

export { ICarImagesRepository, ICreateImageDTO };
