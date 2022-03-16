import { Router } from 'express';

import { AutheticateUserController } from '../modules/accounts/useCases/autheticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AutheticateUserController();

authenticateRoutes.post('/sessions', authenticateUserController.handle);

export { authenticateRoutes };
