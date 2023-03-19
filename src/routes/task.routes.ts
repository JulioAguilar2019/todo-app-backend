import { Router } from 'express';
import { check } from 'express-validator';
import {
  deleteTask,
  getAllTasks,
  getTaskById,
  postTask,
  updateTask,
} from '../controllers';
import {
  taskCategoryExistById,
  taskExistById,
  userExistById,
} from '../helpers';
import { validateFields } from '../middlewares';

const routerTask = Router();

routerTask.get('/', getAllTasks);

routerTask.get(
  '/:id',
  check('id').custom(taskExistById),
  [check('id', 'Id is not valid').isInt(), validateFields],
  getTaskById
);

routerTask.post(
  '/',
  [
    check('name', 'Name is required').isLength({ min: 3 }),
    check('description', 'Description is required').isLength({ min: 3 }),
    check('start_date', 'Start date is required').isDate(),
    check('status', 'Is not a valid status').isIn([
      'Pending',
      'In progress',
      'Completed',
    ]),
    check('task_category_id').custom(taskCategoryExistById),
    check('user_profile_id').custom(userExistById),
    validateFields,
  ],
  postTask
);

routerTask.put(
  '/:id',
  [
    check('name', 'Name is required').isLength({ min: 3 }),
    check('description', 'Description is required').isLength({ min: 3 }),
    check('start_date', 'Start date is required').isDate(),
    check('status', 'Is not a valid status').isIn([
      'Pending',
      'In progress',
      'Completed',
    ]),
    check('id', 'Id is not valid').isInt(),
    check('id').custom(taskExistById),
    check('task_category_id').custom(taskCategoryExistById),
    check('user_profile_id').custom(userExistById),
    validateFields,
  ],
  updateTask
);

routerTask.delete(
  '/:id',
  check('id', 'Id is not valid').isInt(),
  [check('id').custom(taskExistById), validateFields],
  deleteTask
);

export default routerTask;
