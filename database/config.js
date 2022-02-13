import Mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await Mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('BD Online');
  } catch (error) {
    console.log(error);
    throw new Error('BD Connection Error');
  }
};
