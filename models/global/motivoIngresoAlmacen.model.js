import mongoose from 'mongoose';

const motivoIngresoAlmacenSchema = mongoose.Schema(
  {
    idGrupoEmpresarial: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    idEmpresa: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    motivo: {
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

const motivoIngresoAlmacen = mongoose.model('motivosIngresoAlmacenes', motivoIngresoAlmacenSchema);

export default motivoIngresoAlmacen;
