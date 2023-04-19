import mongoose from 'mongoose';
import { empresaActiva } from '../serviciosGlobales.servi.js';
import mLineaTipoMercaderia from '../../models/global/lineaTipoMercaderia.model.js';

export const inUp_LineaTipoMercaderia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inUp_LineaTipoMercaderia <--//<--//`);
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
    console.log(ge.idLineaTipoMercaderia);
    if (ge.idLineaTipoMercaderia == null || ge.idLineaTipoMercaderia == '') {
      console.log('--------ins--------');
      // console.log(ge);
      updated = await mLineaTipoMercaderia.insertMany(
        [
          {
            idGrupoEmpresarial: ge.idGrupoEmpresarial,
            idEmpresa: ge.idEmpresa,
            lineaTipoMercaderia: ge.lineaTipoMercaderia.toUpperCase(),
            usuarioCrea: ge.usuario,
          },
        ],
        { session: session }
      );
      console.log('end IN');
    } else {
      console.log('--------upd--------');
      updated = await mLineaTipoMercaderia.updateOne(
        { _id: ge.idLineaTipoMercaderia },
        {
          idGrupoEmpresarial: ge.idGrupoEmpresarial,
          idEmpresa: ge.idEmpresa,
          lineaTipoMercaderia: ge.lineaTipoMercaderia.toUpperCase(),
          usuarioModifica: ge.usuario,
        },
        { session: session }
      );
      console.log('end UP');
    }

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    if (ge.idLineaTipoMercaderia) {
      updated = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
    }
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return updated;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating inUp_LineaTipoMercaderia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const inUp_LineaTipoMercaderiaUnidad = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inUp_LineaTipoMercaderiaUnidad <--//<--//`);
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
    //verificar si selecciono null LINEA/TIPO Mercaderia
    if (ge.idLineaTipoMercaderia == null) {
      console.log('No ha selecionado una linea/tipo mercadería, verifique.');
      return;
    }
    //
    let updated;
    if (ge.idUnidad == null || ge.idUnidad == '') {
      console.log('Ingreso a INSERT unidad');
      console.log(ge.idLineaTipoMercaderia);
      console.log(ge.idUnidad);
      console.log(ge.unidad);
      const newLineaTipoMercaderia = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
      // console.log(newLineaTipoMercaderia);
      const newUnidad = newLineaTipoMercaderia.unidades.create({
        unidad: ge.unidad.toUpperCase(),
      });
      newLineaTipoMercaderia.unidades.push(newUnidad);
      console.log('J');
      updated = await newLineaTipoMercaderia.save({ session: session });
      if (updated) {
        ge.idUnidad = newUnidad._id;
      }
      //
      console.log('K');
    } else {
      console.log('Ingreso a UDPATE unidad');
      console.log(ge.idLineaTipoMercaderia);
      console.log(ge.idUnidad);
      updated = await mLineaTipoMercaderia.findOneAndUpdate(
        { _id: ge.idLineaTipoMercaderia, 'unidades._id': ge.idUnidad },
        {
          'unidades.$.unidad': ge.unidad.toUpperCase(),
        },
        { session: session }
      );
      console.log('L');
    }

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    updated = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    updated = updated.unidades.id(ge.idUnidad); //
    console.log(updated);
    return updated; //{ _id: 620b53cd3cdfc246f8d437e3, unidad: 'FABY' }
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating inUp_LineaTipoMercaderiaUnidad ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const inUp_LineaTipoMercaderiaMarca = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inUp_LineaTipoMercaderiaMarca <--//<--//`);
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
    //verificar si selecciono nua LINEA/TIPO Mercaderia
    if (ge.idLineaTipoMercaderia == null) {
      console.log('No ha selecionado una linea/tipo mercadería, verifique.');
      return;
    }
    //
    let updated;
    if (ge.idMarca == null || ge.idMarca == '') {
      console.log('Llego a INSERT marca');
      const newLineaTipoMercaderia = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
      const newMarca = newLineaTipoMercaderia.marcas.create({
        marca: ge.marca.toUpperCase(),
      });
      newLineaTipoMercaderia.marcas.push(newMarca);
      updated = await newLineaTipoMercaderia.save({ session: session });
      if (updated) {
        ge.idMarca = newMarca._id;
      }
    } else {
      console.log('Ingreso a UDPATE marca');
      updated = await mLineaTipoMercaderia.findOneAndUpdate(
        { _id: ge.idLineaTipoMercaderia, 'marcas._id': ge.idMarca },
        {
          'marcas.$.marca': ge.marca.toUpperCase(),
        },
        { session: session }
      );
      console.log('L');
    }

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    updated = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
    updated = updated.marcas.id(ge.idMarca);
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return updated;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating inUp_LineaTipoMercaderiaMarca ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const inUp_LineaTipoMercaderiaUnidadEquivalencia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inUp_LineaTipoMercaderiaUnidadEquivalencia <--//<--//`);
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
    //verificar si selecciono nua LINEA/TIPO Mercaderia
    if (ge.idLineaTipoMercaderia == null) {
      console.log('No ha selecionado una linea/tipo mercadería, verifique.');
      return;
    }
    //
    let updated;
    if (ge.idUnidadEquivalencia == null || ge.idUnidadEquivalencia == '') {
      console.log('Llego a INSERT UnidadEquivalencia');
      let newLineaTipoMercaderia = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
      const newUniEqui = newLineaTipoMercaderia.unidadesEquivalencias.create({
        unidadEquivalencia: ge.unidadEquivalencia.toUpperCase(),
      });
      newLineaTipoMercaderia.unidadesEquivalencias.push(newUniEqui);
      updated = await newLineaTipoMercaderia.save({ session: session });
      if (updated) {
        ge.idUnidadEquivalencia = newUniEqui._id;
      }
    } else {
      console.log('Ingreso a UDPATE UnidadEquivalencia');
      updated = await mLineaTipoMercaderia.findOneAndUpdate(
        { _id: ge.idLineaTipoMercaderia, 'unidadesEquivalencias._id': ge.idUnidadEquivalencia },
        {
          'unidadesEquivalencias.$.unidadEquivalencia': ge.unidadEquivalencia.toUpperCase(),
        },
        { session: session }
      );
      console.log('L');
    }

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    updated = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
    updated = updated.unidadesEquivalencias.id(ge.idUnidadEquivalencia);
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    return updated;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating inUp_LineaTipoMercaderiaUnidadEquivalencia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const listar_LineaTipoMercaderia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> listar_LineaTipoMercaderia <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //empresa ACTIVA???
  console.log(ge.idGrupoEmpresarial);
  console.log(ge.idEmpresa);
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
    // if (ge.idLineaTipoMercaderia == null) {
    console.log('J');
    // console.log(ge);
    let newLineaTipoMercaderia = await mLineaTipoMercaderia.find(
      // [
      {
        idGrupoEmpresarial: ge.idGrupoEmpresarial,
        idEmpresa: ge.idEmpresa,
      }
      // ],
      // { session: session }
    );
    console.log('K');
    // } else {
    //   console.log('L');
    //   let updateMotivo = await mLineaTipoMercaderia.updateOne(
    //     { _id: ge.idLineaTipoMercaderia },
    //     {
    //       idGrupoEmpresarial: ge.idGrupoEmpresarial,
    //       idEmpresa: ge.idEmpresa,
    //       lineaTipoMercaderia: ge.lineaTipoMercaderia.toUpperCase(),
    //       usuarioModifica: ge.usuario,
    //     },
    //     { session: session }
    //   );
    //   console.log('M');
    // }

    //finalizando
    console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    console.log(3);
    // return true;
    return newLineaTipoMercaderia;
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating listar_LineaTipoMercaderia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const listar_LineaTipoMercaderiaParametros = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> listar_LineaTipoMercaderiaParametros <--//<--//`);
  // console.log(`***************************************`);
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
    // console.log('J');
    let newLineaTipoMercaderia = await mLineaTipoMercaderia.find({
      _id: ge.idLineaTipoMercaderia,
    });
    // console.log('K');
    //finalizando
    // console.log(2);
    await session.commitTransaction();

    session.endSession();
    console.log('-->Session ACABADO con  commitTransaction <---');
    // console.log(3);
    // return true;
    // console.log('newLineaTipoMercaderia: ', newLineaTipoMercaderia);
    return newLineaTipoMercaderia;
    // return [];
  } catch (error) {
    // console.error();
    console.log(40);
    //errorCompra = error;
    console.log(41);
    //  console.error(errorCompra);
    console.log(42);
    await session.abortTransaction();
    session.endSession();
    throw Error('Error while Paginating listar_LineaTipoMercaderiaParametros ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
  }
};

export const de_LineaTipoMercaderia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> de_LineaTipoMercaderia <--//<--//`);
  // console.log(`***************************************`);
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
  //
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    console.log(ge.idLineaTipoMercaderia);
    let newLineaTipoMercaderia = await mLineaTipoMercaderia.deleteOne(
      { _id: ge.idLineaTipoMercaderia },
      { session: session }
    );

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
    throw Error('Error while Paginating de_LineaTipoMercaderia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const de_LineaTipoMercaderiaUnidad = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> de_LineaTipoMercaderiaUnidad <--//<--//`);
  // console.log(`***************************************`);
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
    // console.log(ge.idLineaTipoM
    let newLineaTipoMercaderia = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
    // console.log(newLineaTipoMercaderia);
    newLineaTipoMercaderia.unidades.id({ _id: ge.idUnidad }, { session: session }).remove();
    //newLineaTipoMercaderia.save;
    newLineaTipoMercaderia.save(function (err) {
      if (err) return handleError(err);
      console.log('the sub-doc was removed');
    });
    // newLineaTipoMercaderia.unidad.remove();

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
    throw Error('Error while Paginating de_LineaTipoMercaderiaUnidad ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const de_LineaTipoMercaderiaMarca = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> de_LineaTipoMercaderiaMarca <--//<--//`);
  // console.log(`***************************************`);
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
    // console.log(ge.idLineaTipoM
    let newLineaTipoMercaderia = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
    // console.log(newLineaTipoMercaderia);
    newLineaTipoMercaderia.marcas.id({ _id: ge.idMarca }, { session: session }).remove();
    //newLineaTipoMercaderia.save;
    newLineaTipoMercaderia.save(function (err) {
      if (err) return handleError(err);
      console.log('the sub-doc was removed');
    });
    // newLineaTipoMercaderia.unidad.remove();

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
    throw Error('Error while Paginating de_LineaTipoMercaderiaMarca ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};

export const de_LineaTipoMercaderiaUnidadEquivalencia = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> de_LineaTipoMercaderiaUnidadEquivalencia <--//<--//`);
  // console.log(`***************************************`);
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
    // console.log(ge.idLineaTipoM
    let newLineaTipoMercaderia = await mLineaTipoMercaderia.findById(ge.idLineaTipoMercaderia);
    // console.log(newLineaTipoMercaderia);
    newLineaTipoMercaderia.unidadesEquivalencias
      .id({ _id: ge.idUnidadEquivalencia }, { session: session })
      .remove();
    //newLineaTipoMercaderia.save;
    newLineaTipoMercaderia.save(function (err) {
      if (err) return handleError(err);
      console.log('the sub-doc was removed');
    });
    // newLineaTipoMercaderia.unidad.remove();

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
    throw Error('Error while Paginating de_LineaTipoMercaderiaUnidadEquivalencia ::| ' + error);
    //console.error('--> abortTransaction <--- ' + error);
    //console.log(43);
    console.log(44);
    console.log(45);
  }
};
