import mCompra from '../models/compra.model.js';

export const insertCompraDesdeAlmacen = async (
  idGrupoEmpresarial,
  idEmpresa,
  idAlmacen,
  idPersona,
  periodoContable,
  tcp,
  fecha,
  serie,
  numero,
  usuarioCrea,
  ses
) => {
  console.log(`***********servi******************************`);
  console.log(`//-->//--> insertCompraDesdeAlmacen <--//<--//`);
  console.log(`**********************************`);
  console.log(`//-->//--> ${idGrupoEmpresarial}: ${idEmpresa}: ${idAlmacen}:  ${serie}`);
  console.log('sesII');
  console.log(ses);
  try {
    const Compra = await mCompra.insertMany(
      [
        {
          idGrupoEmpresarial: idGrupoEmpresarial,
          idEmpresa: idEmpresa,
          idAlmacen: idAlmacen,
          idPersona: idPersona,
          periodoContable: periodoContable,
          tcp: tcp,
          fecha: fecha,
          serie: serie,
          numero: numero,
          usuarioCrea: usuarioCrea,
        },
      ],
      { session: ses }
    );
    return Compra;
  } catch (error) {
    throw Error('Error while Paginating Compra: ' + error);
  }
};
export const insertarKardex = async (query) => {
  console.log(`***********servi***************************`);
  console.log(`//-->//--> insertarKardex <--//<--//`);
  console.log(`************************************`);
  //const kardex = new mongoose
  try {
    console.log('Llego a INSERT kardexxxxxx');
    const newKardex = await mKardex.insertMany(query);
    return newKardex;
  } catch (error) {
    throw Error('Error while Paginating Kardex');
  }
};

export const insertMovimientoIN = async (idKardex) => {
  console.log(`***********servi*******************************`);
  console.log(`//-->//--> insertMovimientoIN <--//<--//`);
  console.log(`****************************************`);
  try {
    console.log('Holis!!!!!!!!!!!!!!!');
    console.log('Llego a INSERT MovimientoIN');
    console.log(idKardex);
    console.log('mIK');
    const newKardex = await mKardex.findById(idKardex.idKardex);
    // console.log(newKardex);
    // console.log(tabla);
    newKardex.movimientos.push({
      FISMA: idKardex.FISMA,
      fechaHoraMovimiento: idKardex.fechaHoraMovimiento,
      IS: true,
      tabla: idKardex.tabla,
      clave: idKardex.clave,
      cantidadIngresada: idKardex.cantidadIngresada,
      cantidadSalida: 0,
      cantidadSaldo: idKardex.suma,
      costoUnitario: idKardex.costoUnitario,
      costoUnitarioMovil: idKardex.CUM,
      costoIngreso: idKardex.CI,
      costoSalida: 0,
      costoSaldo: idKardex.CS,
      usuarioCrea: idKardex.usuario,
      creado: new Date(),
    });
    console.log('Pasó PUSH');
    const updated = await newKardex.save();
    return updated;
    // return newKardex;
  } catch (error) {
    throw Error('Error while Paginating Mercaderia IN');
  }
};

export const insertMovimientoOUT = async (idKardex) => {
  console.log(`***********servi********************************`);
  console.log(`//-->//--> insertMovimientoOUT <--//<--//`);
  console.log(`*****************************************`);
  try {
    console.log('Llego a INSERT MovimientoOUT');
    const newKardex = await mKardex.findById(idKardex.idKardex);
    console.log(newKardex);
    newKardex.movimientos.push({
      FISMA: idKardex.FISMA,
      fechaHoraMovimiento: idKardex.fechaHoraMovimiento,
      IS: false,
      tabla: idKardex.tabla,
      clave: idKardex.clave,
      cantidadIngresada: 0,
      cantidadSalida: idKardex.cantidadSacada,
      cantidadSaldo: idKardex.cuantoQueda,
      costoUnitario: idKardex.cosUNImovi,
      costoUnitarioMovil: idKardex.cosUNImovi,
      costoIngreso: 0,
      costoSalida: idKardex.cosSALI,
      costoSaldo: idKardex.cosSALDO,
      usuarioCrea: idKardex.usuario,
      creado: new Date(),
    });
    const updated = await newKardex.save();
    return updated;
  } catch (error) {
    throw Error('Error while Paginating Movimiento OUT');
  }
};
//--> actualizarValoresPosterioresAl_IS
export const updateMovimientoIN = async (idKardex, idMov, canSALDO, cosSALDO, CUM, usuario) => {
  console.log(`***********servi*******************************`);
  console.log(`//-->//--> updateMovimientoIN <--//<--//`);
  console.log(`****************************************`);
  console.log(`//-->//--> ${idKardex}: ${idMov}: ${canSALDO}`);
  try {
    const Kardex = await mKardex.updateOne(
      { _id: idKardex, 'movimientos._id': idMov },
      {
        'movimientos.$.cantidadSaldo': canSALDO,
        // 'movimientos.$.costoUnitario': costoUnitario,
        'movimientos.$.costoUnitarioMovil': CUM,
        // 'movimientos.$.costoIngreso': costoIngreso,
        // 'movimientos.$.costoSalida': 0,
        'movimientos.$.costoSaldo': cosSALDO,
        'movimientos.$.usuarioModifica': usuario,
        'movimientos.$.modificado': new Date(),
      }
    );
    return Kardex;
  } catch (error) {
    throw Error('Error while Paginating Movimiento IN: ' + error);
  }
};
//--> actualizarValoresPosterioresAl_IS
export const updateMovimientoOUT = async (
  idKardex,
  idMovimiento,
  cantidadSaldo,
  costoSalida,
  costoSaldo,
  costoUnitarioMovil,
  usuarioModifica
) => {
  console.log(`***********servi********************************`);
  console.log(`//-->//--> updateMovimientoOUT <--//<--//`);
  console.log(`*****************************************`);
  console.log(`//-->//--> ${idKardex}: ${idMovimiento}: ${cantidadSaldo}`);
  try {
    const Kardex = await mKardex.updateOne(
      { _id: idKardex, 'movimientos._id': idMovimiento },
      {
        'movimientos.$.cantidadSaldo': cantidadSaldo, //
        'movimientos.$.costoUnitario': costoUnitarioMovil, //
        'movimientos.$.costoUnitarioMovil': costoUnitarioMovil, //
        'movimientos.$.costoSalida': costoSalida, //
        'movimientos.$.costoSaldo': costoSaldo, //
        'movimientos.$.usuarioModifica': usuarioModifica,
        'movimientos.$.modificado': new Date(),
      }
    );
    return Kardex;
  } catch (error) {
    throw Error('Error while Paginating Movimiento OUT: ' + error);
  }
};
