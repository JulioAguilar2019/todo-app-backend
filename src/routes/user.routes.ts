import { Router } from 'express';
import { check } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  createUser,
  updatePassword,
  updateProfile,
} from '../controllers';
import { emailExist, userExistById } from '../helpers';
import { validateFields } from '../middlewares';

const routerUser = Router();

routerUser.get('/', getAllUsers);

routerUser.get(
  '/:id',
  [
    check('id', 'Id must be a integer').isInt(),
    check('id').custom(userExistById),
    validateFields,
  ],
  getUserById
);

routerUser.post(
  '/',
  [
    check('first_name', 'First name must be at least 3 letters long').isLength({
      min: 3,
    }),
    check('first_name', 'The first name must only contain letters').isAlpha(),
    check('last_name', 'Last name must be at least 3 letters long').isLength({
      min: 3,
    }),
    check('last_name', 'The last name must only contain letters').isAlpha(),
    check('email', 'The email has a invalid format').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
    check(
      'confirm_password',
      'Confirm password must be at least 6 characters long'
    ).isLength({
      min: 6,
    }),
    check('tel', 'Phone number must be no more than 10 digits').isLength({
      max: 10,
    }),
    check('tel', 'Phone number must only contain numbers').isNumeric({
      no_symbols: true,
    }),
    check('email').custom(emailExist),
    validateFields,
  ],
  createUser
);

routerUser.delete('/:id', [check('email').custom(emailExist), validateFields]);

routerUser.patch(
  '/update-password/:id',
  [
    check('id', 'Id must be a integer').isInt(),
    check('id').custom(userExistById),
    check('actual_password', 'Actual password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
    check(
      'confirm_password',
      'Confirm password must be at least 6 characters long'
    ).isLength({ min: 6 }),
    validateFields,
  ],
  updatePassword
);

routerUser.patch(
  '/update-profile/:id',
  [
    check('id', 'Id must be a integer').isInt(),
    check('id').custom(userExistById),
    check('first_name', 'First name must be at least 3 letters long').isLength({
      min: 3,
    }),
    check('first_name', 'The first name must only contain letters').isAlpha(),
    check('last_name', 'Last name must be at least 3 letters long').isLength({
      min: 3,
    }),
    check('last_name', 'The last name must only contain letters').isAlpha(),
    check('tel', 'Phone number must be no more than 10 digits').isLength({
      max: 10,
    }),
    check('tel', 'Phone number must only contain numbers').isNumeric({
      no_symbols: true,
    }),
    validateFields,
  ],
  updateProfile
);

export default routerUser;
