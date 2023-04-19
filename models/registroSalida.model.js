import mongoose from 'mongoose';

const documentoAnexosSchema = mongoose.Schema({
  tipo: {
    type: String,
    //required: true,
  },
  tcp: {
    type: String,
    // required: true,
  },
  fecha: {
    type: Date,
    // , required: true
  },
  serie: {
    type: String,
    // required: true,
  },
  numero: {
    type: String,
    // required: true,
  },
  usuarioCrea: { type: String },
  usuarioModifica: { type: String },
  creado: { type: Date },
  modificado: { type: Date },
});

const itemSchema = mongoose.Schema({
  idKardex: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  idMercaderia: {
    type: mongoose.Schema.ObjectId,
    // required: true,
  },
  cantidadSacada: {
    type: mongoose.Decimal128,
    required: true,
  },
  lote: {
    type: String, //mongoose.Schema.ObjectId,
    // required: true,
  },
  usuarioCrea: { type: String },
  usuarioModifica: { type: String },
  creado: { type: Date },
  modificado: { type: Date },
});

const registroSalidaSchema = mongoose.Schema(
  {
    idGrupoEmpresarial: {
      type: mongoose.Schema.ObjectId,
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
    idPersona: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    razonSocialNombre: {
      type: String, //  mongoose.Schema.ObjectId,
      required: true,
    },
    idMotivoSalidaAlmacen: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    motivoSalidaAlmacen: {
      type: String, //  mongoose.Schema.ObjectId,
      required: true,
    },
    FISMA: {
      type: Date, //  mongoose.Schema.ObjectId,
      required: true,
    },
    periodoContable: {
      type: Number, // mongoose.Schema.ObjectId,
      required: true,
    },
    documentosAnexos: [documentoAnexosSchema],
    items: [itemSchema],
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const registroSalidas = mongoose.model('registrosalidasdealmacenes', registroSalidaSchema);

export default registroSalidas;
