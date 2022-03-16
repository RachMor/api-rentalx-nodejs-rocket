import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AutheticateUserUseCase } from './AuthenticateUserUseCase';

class AutheticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateUserUseCase = container.resolve(AutheticateUserUseCase);

    const authenticateInfo = await authenticateUserUseCase.execute({ email, password });
    return res.json(authenticateInfo);
  }
}

export { AutheticateUserController };
