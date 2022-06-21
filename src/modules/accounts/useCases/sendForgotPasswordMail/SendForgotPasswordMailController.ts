import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordEmailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordEmailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgotPasswordMail = container.resolve(SendForgotPasswordEmailUseCase);

    await sendForgotPasswordMail.execute(email);

    return res.send();
  }
}

export { SendForgotPasswordEmailController };
