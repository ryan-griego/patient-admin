import {Schema, model} from 'mongoose';

const PatientSchema = new Schema({
  email: {
    type: String,
  },
  name: {
    name: String
  },
});

export const Patient = model<any>('Patient', PatientSchema);

export default defineEventHandler(async (event) => {
  const patients = await Patient.find();
  return {
    patients,
  };
});
