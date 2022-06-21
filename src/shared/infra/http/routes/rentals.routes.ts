import { Router } from 'express';

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalByUserController } from '../../../../modules/rentals/useCases/createRental/listRentalByUser/ListRentalByUserController';
import { DevolutionRentalController } from '../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();
rentalsRoutes.get('/', ensureAuthenticated, listRentalByUserController.handle);
rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRentalController.handle);

export { rentalsRoutes };
