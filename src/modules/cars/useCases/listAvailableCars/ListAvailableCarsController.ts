import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, category_id, brand } = req.query;
    const listAvailableCars = container.resolve(ListAvailableCarsUseCase);
    const users = await listAvailableCars
      .execute(
        { name: name as string, brand: brand as string, category_id: category_id as string },
      );
    return res.status(200).json(users);
  }
}

export { ListAvailableCarsController };
