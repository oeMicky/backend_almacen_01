import mongoose from 'mongoose';
import { empresaActiva } from '../serviciosGlobales.servi.js';
import mMotivoIngresoAlmacen from '../../models/global/motivoIngresoAlmacen.model.js';
import mMotivoSalidaAlmacen from '../../models/global/motivoSalidaAlmacen.model.js';

export const inUpMotivoIngresoAlmacen = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inMotivoIngresoAlmacen <--//<--//`);
  console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa? ' + empActiva);
  if (empActiva == false) {
    console.log('El empresa y/o grupo empresarial esta inactivo.');
    return;
  }
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    if (ge.idMotivo == null) {
      let newMotivoIngreso = await mMotivoIngresoAlmacen.insertMany(
        [
          {
            idGrupoEmpresarial: ge.idGrupoEmpresarial,
            idEmpresa: ge.idEmpresa,
            motivo: ge.motivo.toUpperCase(),
            usuarioCrea: ge.usuario,
          },
        ],
        { session: session }
      );
    } else {
      let updateMotivo = await mMotivoIngresoAlmacen.updateOne(
        { _id: ge.idMotivo },
        {
          idGrupoEmpresarial: ge.idGrupoEmpresarial,
          idEmpresa: ge.idEmpresa,
          motivo: ge.motivo.toUpperCase(),
          usuarioModifica: ge.usuario,
        },
        { session: session }
      );
    }

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return true;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating inUpMotivoIngresoAlmacen ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const inUpMotivoSalidaAlmacen = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inUpMotivoSalidaAlmacen <--//<--//`);
  console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa? ' + empActiva);
  if (empActiva == false) {
    console.log('El empresa y/o grupo empresarial esta inactivo.');
    return;
  }
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    if (ge.idMotivo == null) {
      let newMotivoIngreso = await mMotivoSalidaAlmacen.insertMany(
        [
          {
            idGrupoEmpresarial: ge.idGrupoEmpresarial,
            idEmpresa: ge.idEmpresa,
            motivo: ge.motivo.toUpperCase(),
            usuarioCrea: ge.usuario,
          },
        ],
        { session: session }
      );
    } else {
      let updateMotivo = await mMotivoSalidaAlmacen.updateOne(
        { _id: ge.idMotivo },
        {
          idGrupoEmpresarial: ge.idGrupoEmpresarial,
          idEmpresa: ge.idEmpresa,
          motivo: ge.motivo.toUpperCase(),
          usuarioModifica: ge.usuario,
        },
        { session: session }
      );
    }

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return true;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating inUpMotivoSalidaAlmacen ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};
