import Appointments from '../models/appointment';
import Mongoose from 'mongoose';

const {
  Types: { ObjectId },
} = Mongoose;

export const getAppointments = async (req, res) => {
  const { search = /.*/ } = req.query;

  const regex = new RegExp(search, 'i');

  const query = {
    $or: [{ name: regex }, { email: regex }, { phone: regex }],
  };

  const [total, appointments] = await Promise.all([
    Appointments.countDocuments(query),
    Appointments.find(query).sort('date'),
  ]);

  res.json({
    ok: true,
    total,
    appointments,
  });
};

export const getAppointmentByID = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ msg: 'Not received a valid ID' });

  const appointment = await Appointments.findById(id);

  if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

  res.json({
    ok: true,
    appointment,
  });
};

export const postAppointment = async (req, res) => {
  const { name, email, phone, scheduledDate, scheduledDateEnd } = req.body;
  const appointment = new Appointments({ name, email, phone, scheduledDate, scheduledDateEnd });

  appointment.save((err, appointment) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({
      ok: true,
      appointment,
    });
  });
};

export const putAppointment = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  Appointments.findByIdAndUpdate(id, body, (err, appointment) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({
      ok: true,
      appointment,
    });
  });
};

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  Appointments.findByIdAndDelete(id, (err, appointment) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({ appointment, ok: true });
  });
};
