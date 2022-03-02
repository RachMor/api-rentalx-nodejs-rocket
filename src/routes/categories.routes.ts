import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/createCategory/index';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) => createCategoryController.handle(req, res));

export { categoriesRoutes };
