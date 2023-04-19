import mongoose from 'mongoose';

const compraSchema = mongoose.Schema(
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
      // required: true,
    },
    periodoContable: {
      type: Number, // mongoose.Schema.ObjectId,
      required: true,
    },
    fecha: { type: Date, required: true },
    tcp: {
      type: String, // required: true,
    },
    serie: { type: String, required: true },
    numero: { type: String, required: true },
    moneda: { type: String, required: true, default: 'PEN' }, //
    tipoCambio: { type: Number, default: 0 },
    igv: { type: Number, required: true, default: 18.0 }, //required: true,
    totalPEN: { type: Number },
    totalUSD: { type: Number },
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const compra = mongoose.model('compras', compraSchema);

export default compra;
