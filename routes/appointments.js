import { Router } from 'express';
import { check } from 'express-validator';

import { getAppointments, postAppointment, deleteAppointment } from '../controllers/appointments';

const router = Router();

router.get('/', getAppointments);

router.post('/', [check('name', 'The name is mandatory').not().isEmpty()], postAppointment);

router.delete('/:id', deleteAppointment);

export default router;
