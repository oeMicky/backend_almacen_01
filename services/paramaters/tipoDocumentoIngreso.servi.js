import mongoose from 'mongoose';
import { empresaActiva } from '../serviciosGlobales.servi.js';
import mTipoDocumentoIngreso from '../../models/global/tipoDocumentoIngreso.model.js';

export const inUp_TipoDocumentoIngreso = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inUp_TipoDocumentoIngreso <--//<--//`);
  console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa? ' + empActiva);
  if (empActiva[0] == false) {
    console.log('---->>>El grupo empresarial no existe.<<<----');
    return empActiva;
  }
  if (empActiva[1] == false) {
    console.log('---->>>El grupo empresarial esta inactivo.<<<----');
    return empActiva;
  }
  if (empActiva[2] == false) {
    console.log('---->>>El empresa no existe.<<<----');
    return empActiva;
  }
  if (empActiva[3] == false) {
    console.log('---->>>El empresa esta inactiva.<<<----');
    return empActiva;
  }
  ////////////////////
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    let updated;
    console.log(ge.idTipoDocumentoIngreso);
    if (ge.idTipoDocumentoIngreso == null || ge.idTipoDocumentoIngreso == '') {
      console.log('--------ins--------');
      // console.log(ge);
      updated = await mTipoDocumentoIngreso.insertMany(
        [
          {
            idGrupoEmpresarial: ge.idGrupoEmpresarial,
            idEmpresa: ge.idEmpresa,
            tipoDocumentoIngreso: ge.tipoDocumentoIngreso.toUpperCase().trim(),
            usuarioCrea: ge.usuario,
          },
        ],
        { session: session }
      );
      console.log('end IN:', updated);
    } else {
      console.log('--------upd--------');
      //   updated = await mTipoDocumentoIngreso.updateOne(
      //     { _id: ge.idTipoDocumentoIngreso },
      //     {
      //       idGrupoEmpresarial: ge.idGrupoEmpresarial,
      //       idEmpresa: ge.idEmpresa,
      //       tipoDocumentoIngreso: ge.tipoDocumentoIngreso.toUpperCase(),
      //       usuarioModifica: ge.usuario,
      //     },
      //     { session: session }
      //   );
      updated = await mTipoDocumentoIngreso.findByIdAndUpdate(
        { _id: ge.idTipoDocumentoIngreso },
        {
          idGrupoEmpresarial: ge.idGrupoEmpresarial,
          idEmpresa: ge.idEmpresa,
          tipoDocumentoIngreso: ge.tipoDocumentoIngreso.toUpperCase().trim(),
          usuarioModifica: ge.usuario,
        },
        { session: session, new: true }
      );
      console.log('end UP:', updated);
    }

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    // if (ge.idTipoDocumentoIngreso) {
    //   updated = await mTipoDocumentoIngreso.findById(ge.idTipoDocumentoIngreso);
    // }
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return updated;
  } catch (error) {
    console.log(666);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating inUp_LineaTipoMercaderia ::| ' + error);
  }
};

export const listar_TiposDocumentosIngresos = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> listar_TiposDocumentosIngresos <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  console.log(ge.idGrupoEmpresarial);
  console.log(ge.idEmpresa);
  const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  console.log('esta empActiva esta activa???? ' + empActiva);
  if (empActiva[0] == false) {
    console.log('---->>>El grupo empresarial no existe.<<<----');
    return empActiva;
  }
  if (empActiva[1] == false) {
    console.log('---->>>El grupo empresarial esta inactivo.<<<----');
    return empActiva;
  }
  if (empActiva[2] == false) {
    console.log('---->>>El empresa no existe.<<<----');
    return empActiva;
  }
  if (empActiva[3] == false) {
    console.log('---->>>El empresa esta inactiva.<<<----');
    return empActiva;
  }
  ////////////////////
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log('J');
    let newMercaderia = await mTipoDocumentoIngreso.find({
      idGrupoEmpresarial: ge.idGrupoEmpresarial,
      idEmpresa: ge.idEmpresa,
    });
    console.log('K');
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    // return true;
    return newMercaderia;
  } catch (error) {
    console.log(666);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating listar_TiposDocumentosIngresos ::| ' + error);
  }
};
