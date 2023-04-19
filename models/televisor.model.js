import mongoose from 'mongoose';

const televisorSchema = mongoose.Schema({
  nombre: String,
  tamanio: mongoose.Decimal128,
});

const televisor = mongoose.model('televisores', televisorSchema);

export default televisor;
