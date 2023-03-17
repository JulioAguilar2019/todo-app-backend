import { Router } from 'express';

const routerTask = Router();

routerTask.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'get API',
  });
});

export default routerTask;
