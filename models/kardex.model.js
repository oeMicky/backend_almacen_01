import mongoose from 'mongoose';

const kardexsMovimientosSchema = mongoose.Schema({
  FISMA: {
    type: Date,
    // required: true,
  },
  fechaHoraMovimiento: {
    type: Date,
    // required: true,
  },
  IS: {
    type: Boolean,
    // required: true,
  },
  tabla: {
    type: String,
    // required: true,
  },
  clave: {
    type: mongoose.Schema.ObjectId,
    // required: true,
  },
  cantidadIngresada: {
    type: mongoose.Decimal128, //Number, //
    // required: true,
  },
  cantidadSalida: {
    type: mongoose.Decimal128, //Number, //
    // required: true,
  },
  cantidadSaldo: {
    type: mongoose.Decimal128, //Number, //
    // required: true,
  },
  costoUnitario: {
    type: mongoose.Decimal128, //Number, //
    // required: true,
  },
  costoUnitarioMovil: {
    type: mongoose.Decimal128, //Number, //
    // required: true,
  },
  costoIngreso: {
    type: mongoose.Decimal128, //Number, //
    // required: true,
  },
  costoSalida: {
    type: mongoose.Decimal128, //Number, //
    // required: true,
  },
  costoSaldo: {
    type: mongoose.Decimal128, //Number, //
    // required: true,
  },
  usuarioCrea: { type: String },
  usuarioModifica: { type: String },
  creado: { type: Date },
  modificado: { type: Date },
});

const kardexSchema = mongoose.Schema(
  {
    idGrupoEmpresarial: {
      type: mongoose.Schema.ObjectId, //Number
      required: true,
    },
    idEmpresa: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    idAlmacen: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    idMercaderia: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    lote: { type: String },
    fechaVencimiento: { type: Date /*required: true*/ },
    activo: {
      type: Boolean,
      default: true,
      required: true,
    },
    movimientos: [kardexsMovimientosSchema],
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const kardexs = mongoose.model('kardexs', kardexSchema);

export default kardexs;
