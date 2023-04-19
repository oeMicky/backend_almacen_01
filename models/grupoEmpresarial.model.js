import mongoose from 'mongoose';

const almacenSchema = mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,
});

const empresaSchema = mongoose.Schema({
  idPersona: { type: mongoose.Schema.ObjectId, required: true },
  activo: Boolean,
  agentePercepcion: {
    type: Boolean,
    // required: true,
  },
  agenteRetencion: {
    type: Boolean,
    // required: true,
  },
  almacenes: [almacenSchema],
  usuarioCrea: { type: String },
  usuarioModifica: { type: String },
  creado: { type: Date },
  modificado: { type: Date },
});

const grupoEmpresarialSchema = mongoose.Schema(
  {
    nombre: String,
    empresas: [empresaSchema],
    activo: Boolean,
    porDefecto: Boolean,
    usuarioCrea: { type: String },
    usuarioModifica: { type: String },
  },
  {
    timestamps: true,
  }
);

const grupoEmpresarial = mongoose.model('gruposEmpresariales', grupoEmpresarialSchema);

export default grupoEmpresarial;
