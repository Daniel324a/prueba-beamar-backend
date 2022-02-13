import Express from 'express';

import Appointments from '../models/appointment';

const { response, request } = Express;

export const checkDate = async (req = request, res = response, next) => {
  const { scheduledDate, scheduledDateEnd } = req.body;

  const exist = await Appointments.exists({ scheduledDate });

  if (exist)
    return res.status(400).json({
      ok: false,
      msg: 'There is already an appointment scheduled for this date and time',
    });

  // Get a list of appointments that match in range with the request
  const matchedDates = await Appointments.find({
    $or: [
      { scheduledDate: { $gte: scheduledDate, $lt: scheduledDateEnd } },
      { scheduledDateEnd: { $gte: scheduledDate, $lt: scheduledDateEnd } },
    ],
  });

  if (matchedDates.length > 0)
    return res.status(400).json({
      ok: false,
      msg: 'Date and time occupied by another appointment',
    });

  next();
};
