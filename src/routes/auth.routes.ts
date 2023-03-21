import { Router } from 'express';
import { loginUser } from '../controllers/auth/auth.controller';
import { check } from 'express-validator';
import { emailExist } from '../helpers';
import { validateFields } from '../middlewares';

const routerAuth = Router();

routerAuth.post(
  '/login',
  [
    check('email').custom(emailExist),
    check('email', 'The email format is not correct').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields,
  ],
  loginUser
);

export default routerAuth;
