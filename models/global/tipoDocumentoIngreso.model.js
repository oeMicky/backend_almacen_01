import mongoose from 'mongoose';

const tipoDocumentoIngresoSchema = mongoose.Schema(
  {
    idGrupoEmpresarial: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    idEmpresa: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    tipoDocumentoIngreso: {
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

const tipoDocumentoIngreso = mongoose.model('tipoDocumentoIngresos', tipoDocumentoIngresoSchema);

export default tipoDocumentoIngreso;
