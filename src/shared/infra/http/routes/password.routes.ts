import { Router } from 'express';

import { ResetPasswordUserController } from '../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordEmailController } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotEmailController = new SendForgotPasswordEmailController();
const resetPasswordUSerController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotEmailController.handle);
passwordRoutes.post('/reset', resetPasswordUSerController.handle);

export { passwordRoutes };
