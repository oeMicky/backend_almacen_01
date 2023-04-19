import mongoose from 'mongoose';

const igvSchema = mongoose.Schema(
  {
    fechaInicioVigencia: {
      type: Date,
      required: true,
    },
    igv: {
      type: Number,
      required: true,
    },
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const igv = mongoose.model('igvs', igvSchema);

export default igv;
