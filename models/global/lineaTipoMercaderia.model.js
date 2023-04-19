import mongoose from 'mongoose';

const unidadEquivalenciaSchema = mongoose.Schema({
  unidadEquivalencia: { type: String },
});

const marcaSchema = mongoose.Schema({
  marca: { type: String },
});

const unidadSchema = mongoose.Schema({
  unidad: { type: String },
});

const lineaTipoMercaderiaSchema = mongoose.Schema(
  {
    lineaTipoMercaderia: {
      type: String,
      required: true,
    },
    idEmpresa: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    idGrupoEmpresarial: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    unidades: [unidadSchema],
    marcas: [marcaSchema],
    unidadesEquivalencias: [unidadEquivalenciaSchema],
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const lineaTipoMercaderia = mongoose.model('lineaTipoMercaderias', lineaTipoMercaderiaSchema);

export default lineaTipoMercaderia;
