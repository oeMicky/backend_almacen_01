import mongoose from 'mongoose';

const motivoSalidaAlmacenSchema = mongoose.Schema(
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

const motivoSalidaAlmacen = mongoose.model('motivosSalidaAlmacenes', motivoSalidaAlmacenSchema);

export default motivoSalidaAlmacen;
