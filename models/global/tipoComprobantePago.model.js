import mongoose from 'mongoose';

const tipoComprobantePagoSchema = mongoose.Schema(
  {
    idGrupoEmpresarial: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    idEmpresa: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    codigo: {
      type: String,
      max: 2,
      required: true,
    },
    tipoComprobantePago: {
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

const tipoComprobantePago = mongoose.model('tipoComprobantePagos', tipoComprobantePagoSchema);

export default tipoComprobantePago;
