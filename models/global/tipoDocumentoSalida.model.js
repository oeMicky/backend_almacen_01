import mongoose from 'mongoose';

const tipoDocumentoSalidaSchema = mongoose.Schema(
  {
    idGrupoEmpresarial: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    idEmpresa: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    tipoDocumentoSalida: {
      type: String,
      required: true,
    },
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const tipoDocumentoSalida = mongoose.model('tipoDocumentoSalidas', tipoDocumentoSalidaSchema);

export default tipoDocumentoSalida;
