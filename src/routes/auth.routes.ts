import { Router } from 'express';
import { loginUser } from '../controllers/auth.controller';
import { check } from 'express-validator';
import { emailExist } from '../helpers';

const routerAuth = Router();

routerAuth.post('/login', loginUser, 
[
    check('email').custom(emailExist),
    check('email', 'The email format is not correct').isEmail()
]
);

export default routerAuth;