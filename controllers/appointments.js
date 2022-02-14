import Appointments from '../models/appointment';

export const getAppointments = async (req, res) => {
  const { busqueda = /.*/ } = req.query;

  const regex = new RegExp(busqueda, 'i');

  const query = {
    name: regex,
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

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  Appointments.findByIdAndDelete(id, (err, appointment) => {
    if (err) return res.status(400).json({ msg: err.message, errors: err.errors });

    res.json({ appointment, ok: true });
  });
};
