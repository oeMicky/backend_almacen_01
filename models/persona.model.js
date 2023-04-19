import mongoose from 'mongoose';

const telefonosSchema = mongoose.Schema({
  telefono: String,
});
const correosSchema = mongoose.Schema({
  correo: String,
});
const direccionesSchema = mongoose.Schema({
  direccion: String,
});
const cuentasCorrientesSchema = mongoose.Schema({
  banco: String,
  moneda: String,
  cuentaCorriente: String,
});
const personaSchema = mongoose.Schema(
  {
    tipoDocumentoIdentidad: {
      type: String, //  mongoose.Schema.ObjectId,
      required: true,
    },
    valorTDI: {
      type: String, //  mongoose.Schema.ObjectId,
      required: true,
    },
    razonSocial: {
      type: String, //  mongoose.Schema.ObjectId,
      //   required: true,
    },
    nombres: { type: String },
    apellidoPaterno: { type: String },
    apellidoMaterno: { type: String },
    activo: { type: Boolean, default: true, required: true },
    agentePercepcion: { type: Boolean },
    agenteRetencion: { type: Boolean },
    contacto: String,
    notificar: Boolean,
    telefonos: [telefonosSchema],
    correos: [correosSchema],
    direcciones: [direccionesSchema],
    cuentasCorrientes: [cuentasCorrientesSchema],
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const persona = mongoose.model('personas', personaSchema);

export default persona;

// const kardexsMovimientosSchema = mongoose.Schema({
//   FISMA: {
//     type: Date,
//     // required: true,
//   },
//   fechaHoraMovimiento: {
//     type: Date,
//     // required: true,
//   },
//   IS: {
//     type: Boolean,
//     // required: true,
//   },
//   tabla: {
//     type: String,
//     // required: true,
//   },
//   clave: {
//     type: Number, //mongoose.Schema.ObjectId,
//     // required: true,
//   },
//   cantidadIngresada: {
//     type: mongoose.Decimal128, //Number, //
//     // required: true,
//   },
//   cantidadSalida: {
//     type: mongoose.Decimal128, //Number, //
//     // required: true,
//   },
//   cantidadSaldo: {
//     type: mongoose.Decimal128, //Number, //
//     // required: true,
//   },
//   costoUnitario: {
//     type: mongoose.Decimal128, //Number, //
//     // required: true,
//   },
//   costoUnitarioMovil: {
//     type: mongoose.Decimal128, //Number, //
//     // required: true,
//   },
//   costoIngreso: {
//     type: mongoose.Decimal128, //Number, //
//     // required: true,
//   },
//   costoSalida: {
//     type: mongoose.Decimal128, //Number, //
//     // required: true,
//   },
//   costoSaldo: {
//     type: mongoose.Decimal128, //Number, //
//     // required: true,
//   },
//   usuarioCrea: { type: String },
//   usuarioModifica: { type: String },
//   creado: { type: Date },
//   modificado: { type: Date },
// });
