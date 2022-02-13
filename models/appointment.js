import Mongoose from 'mongoose';

const AppointmentSchema = Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    scheduledDate: {
      type: String,
      required: true,
      unique: true,
    },
    scheduledDateEnd: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default Mongoose.model('Appointment', AppointmentSchema);
