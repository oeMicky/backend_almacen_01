import mongoose from 'mongoose';

const documentoAdjuntoSchema = mongoose.Schema({
  idTipoDocumento: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  tipoDocumento: {
    type: String,
    // required: true,
  },
  idTCP: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  tcp: {
    type: String,
    // required: true,
  },
  fecha: {
    type: Date,
    required: true,
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

const itemMercaderiaSchema = mongoose.Schema({
  idKardex: {
    type: mongoose.Schema.ObjectId,
    // required: true,
  },
  idMercaderia: {
    type: mongoose.Schema.ObjectId,
    // required: true,
  },
  cantidadIngresada: {
    type: mongoose.Decimal128,
    required: true,
  },
  costoUnitario: {
    type: mongoose.Decimal128,
    required: true,
  },
  valorUnitario: {
    //valor unitario es el monto sin IGV
    type: mongoose.Decimal128,
    // required: true,
  },
  monto: {
    type: mongoose.Decimal128,
    required: true,
  },
  lote: {
    type: String, //mongoose.Schema.ObjectId,
    // required: true,
  },
  codigo: {
    type: String, //mongoose.Schema.ObjectId,
    required: true,
  },
  descripcion: {
    type: String, //mongoose.Schema.ObjectId,
    required: true,
  },
  idLineaTipo: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  lineaTipo: {
    type: String, //mongoose.Schema.ObjectId,
    required: true,
  },
  usuarioCrea: { type: String },
  usuarioModifica: { type: String },
  creado: { type: Date },
  modificado: { type: Date },
});

const registroIngresoSchema = mongoose.Schema(
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
    // idPersona: {
    //   type: mongoose.Schema.ObjectId,
    //   // required: true,
    // },
    razonSocialNombre: {
      type: String, //  mongoose.Schema.ObjectId,
      required: true,
    },
    valorDocumentoIdentidad: {
      type: String, //  mongoose.Schema.ObjectId,
      required: true,
    },
    tipoDocumentoIdentidad: {
      // 1, 6 ,
      type: String, //  mongoose.Schema.ObjectId,
      required: true,
    },
    tipoDocumentoLiteral: {
      type: String, //  mongoose.Schema.ObjectId,
      required: true,
    },
    idMotivoIngresoAlmacen: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    motivoIngresoAlmacen: {
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
    documentosAdjuntos: [documentoAdjuntoSchema],
    itemsMercaderias: [itemMercaderiaSchema],
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const registroIngresos = mongoose.model('registroingresosaalmacenes', registroIngresoSchema);

export default registroIngresos;
