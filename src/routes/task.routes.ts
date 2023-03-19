import { Router } from 'express';
import { deleteTask, getTasks, postTask, updateTask } from '../controllers';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';
import {
  taskCategoryExistById,
  taskExistById,
  userExistById,
} from '../helpers';

const routerTask = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *     type: object
 *     properties:
 *      id:
 *       type: string
 *       description: The auto-generated id of the task
 *      name:
 *       type: string
 *       description: The name of the task
 *      description:
 *       type: string
 *       description: The description of the task
 *      start_date:
 *       type: string
 *       format: date
 *       description: The start date of the task
 *      start_time:
 *       type: string
 *       format: time
 *       description: The start time of the task
 *      end_date:
 *       type: string
 *       format: date
 *       description: The end date of the task
 *      end_time:
 *       type: string
 *       format: time
 *       description: The end time of the task
 *      status:
 *       type: string
 *       description: The status of the task
 *      task_category_id:
 *       type: integer
 *       description: The task category id of the task
 *      user_profile_id:
 *       type: integer
 *       description: The user profile id of the task
 *     required:
 *      - id
 *      - name
 *      - description
 *      - start_date
 *      - status
 *      - task_category_id
 *      - user_profile_id
 *     example:
 *       id: 1
 *       name: Task 1
 *       description: Task 1 description
 *       start_date: 2021-01-01
 *       start_time: 10:00:00
 *       end_date: 2021-01-02
 *       end_time: 12:00:00
 *       status: pending
 *       task_category_id: 1
 *       user_profile_id: 1
 *
 */

/**
 * @swagger
 * v1/api/tasks:
 *  get:
 *   summary: Get all tasks
 *   description: this function returns all tasks
 *   responses:
 *    200:
 *      description: Success
 *      content:
 *       application/json:
 *        schema:
 *          type: array
 *          items:
 *           $ref: '#/components/schemas/Task'
 * */

routerTask.get('/', getTasks);

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
