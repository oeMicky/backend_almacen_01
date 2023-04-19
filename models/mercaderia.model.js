import mongoose from 'mongoose';

const equivalenciaSchema = mongoose.Schema({
  descripcionEquivalencia: { type: String, trim: true, uppercase: true },
  tipoEq: { type: Boolean }, //DIRECTA - INDIRECTA
  factor: { type: mongoose.Number },
  idAuxiliar: { type: mongoose.Number },
  idUnidadEquivalencia: {
    type: mongoose.Schema.ObjectId,
    // required: true,
  },
  unidadEquivalencia: { type: String, trim: true, uppercase: true },
  laEquivalencia: {
    type: mongoose.Decimal128,
  },
  pesoKg: { type: mongoose.Number },
});

const mercaderiaSchema = mongoose.Schema(
  {
    idEmpresa: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    idGrupoEmpresarial: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    activo: {
      type: Boolean,
      required: true,
    },
    codigo: {
      type: String,
      required: true,

      // unique: true,
      // index: true,
      maxLength: 13,
    },
    descripcion: {
      type: String,
      required: true,
    },
    idLineaTipo: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    lineaTipo: {
      type: String,
      // required: true,
      // uppercase: true,
    },
    idUnidad: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    unidad: {
      type: String,
      // required: true,
      // uppercase: true,
    },
    idMarca: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    marca: {
      type: String,
      // required: true,
      // uppercase: true,
    },
    // presentacion: {
    //   type: String,
    //   // required: true,
    //   // uppercase: true,
    // },
    conFechaVencimientoLote: { type: Boolean },
    stockMinimo: { type: mongoose.Number },
    equivalencias: [equivalenciaSchema],
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const mercaderia = mongoose.model('mercaderias', mercaderiaSchema);

export default mercaderia;
