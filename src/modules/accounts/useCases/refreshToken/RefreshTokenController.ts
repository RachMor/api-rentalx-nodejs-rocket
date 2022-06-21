import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token = req.body.toke || req.headers['x-acess-token'] || req.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const response = await refreshTokenUseCase.execute(token);
    return res.json(response);
  }
}

export { RefreshTokenController };
