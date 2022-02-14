import { Router } from 'express';
import { check } from 'express-validator';

import {
  getAppointments,
  getAppointmentByID,
  postAppointment,
  putAppointment,
  deleteAppointment,
} from '../controllers/appointments';
import { checkDate } from '../middlewares/checkDate';

const router = Router();

router.get('/', getAppointments);
router.get('/:id', getAppointmentByID);

router.post(
  '/',
  [
    check('name', 'The name is mandatory').not().isEmpty(),
    check('phone', 'The phone is mandatory').not().isEmpty(),
    check('email', 'The email is mandatory').not().isEmpty(),
    check('scheduledDate', 'The scheduled date is mandatory').not().isEmpty(),
    checkDate,
  ],
  postAppointment
);

router.put('/:id', checkDate, putAppointment);
router.delete('/:id', deleteAppointment);

export default router;
