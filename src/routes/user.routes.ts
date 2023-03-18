import { Router } from 'express';
import { usersGet } from '../controllers/user.controller';

const routerUser = Router();

routerUser.get('/', usersGet);

export default routerUser;
