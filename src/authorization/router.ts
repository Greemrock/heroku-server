/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { StatusCodes } from '../common';
import { Authorization } from './authorization';
import { logIn } from './repository';

const router = Router();

// Get password and login
router.post('/', (req, res) => {
  const data = req.body as Authorization;

  const authorization = logIn(data.username, data.password);
  if (!authorization) {
    return res.sendStatus(StatusCodes.NotFound);
  }
  return res.json(authorization).status(200);
});

export default router;
