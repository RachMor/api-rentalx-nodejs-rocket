import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const all = await this.listCategoriesUseCase.execute();
      return res.status(200).json(all);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { ListCategoriesController };
