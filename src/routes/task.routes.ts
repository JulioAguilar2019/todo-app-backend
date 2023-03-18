import { Router } from 'express';
import { getTasks, postTask } from '../controllers';
import { check } from 'express-validator';
import { validateFields } from '../middlewares';

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
 *      end_date:
 *       type: string
 *       format: date
 *       description: The end date of the task
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
 *       end_date: 2021-01-02
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
    check('name', 'Name is required').not().isEmpty().isLength({ min: 3 }),
    check('description', 'Description is required')
      .not()
      .isEmpty()
      .isLength({ min: 3 }),
    check('start_date', 'Start date is required').not().isEmpty(),
    // check('status', 'Is not a valid status').isIn([
    //   'Pending',
    //   'In progress',
    //   'Completed',
    // ]),
    //TODO check if task_category_id exists
    //TODO check if user_profile_id exists
    validateFields,
  ],
  postTask
);

export default routerTask;
