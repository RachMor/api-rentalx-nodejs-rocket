import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { id } = req.params;
    console.log(user_id);
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);
    const rental = await devolutionRentalUseCase.execute({ user_id, rental_id: id });
    return res.status(200).json(rental);
  }
}

export { DevolutionRentalController };
