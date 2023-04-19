import mongoose from 'mongoose';
import { empresaActiva } from './serviciosGlobales.servi.js';
import mEgresoMercaderias from '../models/registroSalida.model.js';
import mMotivoEgresoAlmacen from '../models/global/motivoSalidaAlmacen.model.js';
import fetch from 'node-fetch';

export const listar_Egresos_Mercaderias = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> listar_Egresos_Mercaderias <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  console.log(ge.idGrupoEmpresarial);
  console.log(ge.idEmpresa);
  //#region verificacion de EMPRESA ACTIVA
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
  //#endregion
  ////////////////////
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    // if (ge.idLineaTipoMercaderia == null) {
    console.log('J');
    // console.log(ge);
    let newMercaderia = await mEgresoMercaderias.find(
      // [
      {
        idGrupoEmpresarial: ge.idGrupoEmpresarial,
        idEmpresa: ge.idEmpresa,
      }
      // ],
      // { session: session }
    );
    console.log('K');
    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    // return true;
    return newMercaderia;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating listar_Egresos_Mercaderias ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const listar_Motivos_Egresos_Almacen = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> listar_Motivos_Egresos_Almacen <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  console.log(ge.idGrupoEmpresarial);
  console.log(ge.idEmpresa);
  //#region verificacion de EMPRESA ACTIVA
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
  //#endregion

  ////////////////////
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    // if (ge.idLineaTipoMercaderia == null) {
    console.log('J');
    // console.log(ge);
    let newMercaderia = await mMotivoEgresoAlmacen.find(
      // [
      {
        idGrupoEmpresarial: ge.idGrupoEmpresarial,
        idEmpresa: ge.idEmpresa,
      }
      // ],
      // { session: session }
    );
    console.log('K');
    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    // return true;
    return newMercaderia;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating listar_Egresos_Mercaderias ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const cargar_Tipo_Cambio = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> cargar_Tipo_Cambio <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  // console.log(ge.idGrupoEmpresarial);
  // console.log(ge.idEmpresa);
  // //#region verificacion de EMPRESA ACTIVA
  // const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  // console.log('esta empActiva esta activa???? ' + empActiva);
  // if (empActiva[0] == false) {
  //   console.log('---->>>El grupo empresarial no existe.<<<----');
  //   return empActiva;
  // }
  // if (empActiva[1] == false) {
  //   console.log('---->>>El grupo empresarial esta inactivo.<<<----');
  //   return empActiva;
  // }
  // if (empActiva[2] == false) {
  //   console.log('---->>>El empresa no existe.<<<----');
  //   return empActiva;
  // }
  // if (empActiva[3] == false) {
  //   console.log('---->>>El empresa esta inactiva.<<<----');
  //   return empActiva;
  // }
  //#endregion

  ////////////////////
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    // if (ge.idLineaTipoMercaderia == null) {
    console.log('J', ge.cargarTipoCambio);
    // console.log(ge);
    // let newMercaderia = await fetch(
    //   'https://api.apis.net.pe/v1/tipo-cambio-sunat?fecha=2021-06-23'
    // );
    const cadenaURL = 'https://api.apis.net.pe/v1/tipo-cambio-sunat?fecha=' + ge.cargarTipoCambio;
    console.log('cadenaURL', cadenaURL);
    const apiResponse = await fetch(
      // 'https://api.apis.net.pe/v1/tipo-cambio-sunat?fecha=2021-06-23'
      cadenaURL
    );
    const apiResponseJson = await apiResponse.json();
    console.log('apiResponseJson', apiResponseJson);
    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    // return true;
    return apiResponseJson;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating cargar_Tipo_Cambio ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};
