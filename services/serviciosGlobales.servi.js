import mongoose from 'mongoose';
import mGrupoEmpresarial from '../models/grupoEmpresarial.model.js';

let empresa = 0;

function IdPersona(grupo) {
  console.log('empresa  ', empresa);
  //   return grupo.usuarioCrea === empresa;
  // return grupo.idPersona.toString() === empresa.toString() ? true : false;
  return grupo._id.toString() === empresa.toString() ? true : false;
}

export const empresaActiva = async (idGrupoEmpresarial, idEmpresa) => {
  console.log(`***********servicio GLOBAL***************************`);
  console.log(`//-->//--> empresaActiva <--//<--//`);
  // console.log(`************************************`);
  let activoGrupoEmpresarial = false;
  let activoEmpresa = false;
  let existeGrupoEmpresarial = false;
  let existeEmpresa = false;

  const ge = await mGrupoEmpresarial.findById({
    _id: mongoose.Types.ObjectId(idGrupoEmpresarial),
  });
  // console.log('ge', ge);
  if (ge === null || typeof ge === 'undefined') {
    existeGrupoEmpresarial = false;
  } else {
    existeGrupoEmpresarial = true;
    if (ge.activo == false) {
      activoGrupoEmpresarial = false;
    } else {
      activoGrupoEmpresarial = true;
      console.log('entro-----empresaActiva');
      empresa = idEmpresa;
      //console.log(ge.empresas.find(IdPersona));
      const emp = ge.empresas.find(IdPersona);
      // const emp = ge.empresas.findById({ _id: mongoose.Types.ObjectId(idEmpresa) });
      // console.log('emp  ', emp);
      if (typeof emp === 'undefined') {
        existeEmpresa = false;
        activoEmpresa = false;
      } else {
        existeEmpresa = true;
        if (emp.activo == false) {
          activoEmpresa = false;
        } else {
          activoEmpresa = true;
        }
      }
    }
  }
  console.log('salio-----empresaActiva');
  return [existeGrupoEmpresarial, activoGrupoEmpresarial, existeEmpresa, activoEmpresa];
};
