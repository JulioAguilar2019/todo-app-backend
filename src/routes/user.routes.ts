import { Router } from 'express';
import { usersGet } from '../controllers/user.controller';

const routerUser = Router();

routerUser.get('/', usersGet);
routerUser.get('/:id');
routerUser.post('/');
routerUser.put('/:id');
routerUser.delete('/:id');

export default routerUser;
