import mongoose from 'mongoose';
import { empresaActiva } from '../serviciosGlobales.servi.js';
import mTipoComprobantePago from '../../models/global/tipoComprobantePago.model.js';

export const inUp_TipoComprobantePago = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inUp_TipoComprobantePago <--//<--//`);
  console.log(`***************************************`);
  const ge = preto.elJson;
  //#region empresa ACTIVA???
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
  //#endregion
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    let updated;
    console.log(ge.idTipoComprobantePago);
    if (ge.idTipoComprobantePago == null || ge.idTipoComprobantePago == '') {
      console.log('--------ins--------');
      // console.log(ge);
      updated = await mTipoComprobantePago.insertMany(
        [
          {
            idGrupoEmpresarial: ge.idGrupoEmpresarial,
            idEmpresa: ge.idEmpresa,
            codigo: ge.codigo.trim(),
            tipoComprobantePago: ge.tipoComprobantePago.toUpperCase().trim(),
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
      updated = await mTipoComprobantePago.findByIdAndUpdate(
        { _id: ge.idTipoComprobantePago },
        {
          idGrupoEmpresarial: ge.idGrupoEmpresarial,
          idEmpresa: ge.idEmpresa,
          codigo: ge.codigo.trim(),
          tipoComprobantePago: ge.tipoComprobantePago.toUpperCase().trim(),
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
    throw Error('Error while Paginating inUp_TipoComprobantePago ::| ' + error);
  }
};

export const listar_TiposComprobantesPagos = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> listar_TiposComprobantesPagos <--//<--//`);
  // console.log(`***************************************`);
  const ge = preto.elJson;
  //#region empresa ACTIVA???
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
  //#endregion
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log('J');
    let newMercaderia = await mTipoComprobantePago.find({
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
    throw Error('Error while Paginating listar_TiposComprobantesPagos ::| ' + error);
  }
};

export const inBlock_TipoComprobantePago = async (preto) => {
  console.log(`***********servi***********************`);
  console.log(`//-->//--> inBlock_TipoComprobantePago <--//<--//`);
  console.log(`***************************************`);
  const ge = preto.elJson;
  //#region empresa ACTIVA???
  // const empActiva = await empresaActiva(ge.idGrupoEmpresarial, ge.idEmpresa);
  // console.log('esta empActiva esta activa? ' + empActiva);
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
  try {
    console.log(1);
    const session = await mongoose.startSession();
    session.startTransaction();
    //
    let updated;
    console.log(ge.idTipoComprobantePago);
    if (ge.idTipoComprobantePago == null || ge.idTipoComprobantePago == '') {
      console.log('--------ins--------');
      // console.log(ge);
      // updated = await mTipoComprobantePago.collection
      updated = await mTipoComprobantePago.insertMany(
        [
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '00',
            tipoComprobantePago: 'Otros'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '01',
            tipoComprobantePago: 'Factura'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '02',
            tipoComprobantePago: 'Recibo por Honorarios'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '03',
            tipoComprobantePago: 'Boleta de Venta'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '04',
            tipoComprobantePago: 'Liquidación de compra'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '05',
            tipoComprobantePago:
              'Boletos de Transporte Aéreo que emiten las Compañías de Aviación Comercial por el servicio de transporte aéreo regular de pasajeros, emitido de manera manual, mecanizada o por medios electrónicos (BME)'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '06',
            tipoComprobantePago: 'Carta de porte aéreo por el servicio de transporte de carga aérea'
              .toUpperCase()
              .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '07',
            tipoComprobantePago: 'Nota de crédito'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '08',
            tipoComprobantePago: 'Nota de débito'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '09',
            tipoComprobantePago: 'Guía de remisión - Remitente'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '10',
            tipoComprobantePago: 'Recibo por Arrendamiento'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '11',
            tipoComprobantePago:
              'Póliza emitida por las Bolsas de Valores, Bolsas de Productos o Agentes de Intermediación por operaciones realizadas en las Bolsas de Valores o Productos o fuera de las mismas, autorizadas por SMV'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '12',
            tipoComprobantePago: 'Ticket o cinta emitido por máquina registradora'
              .toUpperCase()
              .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '13',
            tipoComprobantePago:
              'Documentos emitidos por las empresas del sistema financiero y de seguros, y por las cooperativas de ahorro y crédito no autorizadas a captar recursos del público, que se encuentren bajo el control de la Superintendencia de Banca, Seguros y AFP.'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '14',
            tipoComprobantePago:
              'Recibo por servicios públicos de suministro de energía eléctrica, agua, teléfono, telex y telegráficos y otros servicios complementarios que se incluyan en el recibo de servicio público'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '15',
            tipoComprobantePago:
              'Boletos emitidos por el servicio de transporte terrestre regular urbano de pasajeros y el ferroviario público de pasajeros prestado en vía férrea local.'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '16',
            tipoComprobantePago:
              'Boletos de viaje emitidos por las empresas de transporte nacional de pasajeros, siempre que cuenten con la autorización de la autoridad competente, en las rutas autorizadas. Vía terrestre o ferroviario público no emitido por medios electrónicos (BVME)'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '17',
            tipoComprobantePago:
              'Documento emitido por la Iglesia Católica por el arrendamiento de bienes inmuebles'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '18',
            tipoComprobantePago:
              'Documento emitido por las Administradoras Privadas de Fondo de Pensiones que se encuentran bajo la supervisión de la Superintendencia de Banca, Seguros y AFP'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '19',
            tipoComprobantePago: 'Boleto o entrada por atracciones y espectáculos públicos'
              .toUpperCase()
              .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '20',
            tipoComprobantePago: 'Comprobante de Retención'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '21',
            tipoComprobantePago:
              'Conocimiento de embarque por el servicio de transporte de carga marítima'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '22',
            tipoComprobantePago: 'Comprobante por Operaciones No Habituales'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '23',
            tipoComprobantePago:
              'Pólizas de Adjudicación emitidas con ocasión del remate o adjudicación de bienes por venta forzada, por los martilleros o las entidades que rematen o subasten bienes por cuenta de terceros'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '24',
            tipoComprobantePago: 'Certificado de pago de regalías emitidas por PERUPETRO S.A'
              .toUpperCase()
              .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '25',
            tipoComprobantePago:
              'Documento de Atribución (Ley del Impuesto General a las Ventas e Impuesto Selectivo al Consumo, Art. 19º, último párrafo, R.S. N° 022-98-SUNAT).'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '26',
            tipoComprobantePago:
              'Recibo por el Pago de la Tarifa por Uso de Agua Superficial con fines agrarios y por el pago de la Cuota para la ejecución de una determinada obra o actividad acordada por la Asamblea General de la Comisión de Regantes o Resolución expedida por el Jefe de la Unidad de Aguas y de Riego (Decreto Supremo N° 003-90-AG, Arts. 28 y 48)'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '27',
            tipoComprobantePago: 'Seguro Complementario de Trabajo de Riesgo'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '28',
            tipoComprobantePago:
              'Documentos emitidos por los servicios aeroportuarios prestados a favor de los pasajeros, mediante mecanismo de etiquetas autoadhesivas.'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '29',
            tipoComprobantePago:
              'Documentos emitidos por la COFOPRI en calidad de oferta de venta de terrenos, los correspondientes a las subastas públicas y a la retribución de los servicios que presta'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '30',
            tipoComprobantePago:
              'Documentos emitidos por las empresas que desempeñan el rol adquirente en los sistemas de pago mediante tarjetas de crédito y débito, emitidas por bancos e instituciones financieras o crediticias, domiciliados o no en el país.'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '31',
            tipoComprobantePago: 'Guía de Remisión - Transportista'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '32',
            tipoComprobantePago:
              'Documentos emitidos por las empresas recaudadoras de la denominada Garantía de Red Principal a la que hace referencia el numeral 7.6 del artículo 7° de la Ley N° 27133 – Ley de Promoción del Desarrollo de la Industria del Gas Natural'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '33',
            tipoComprobantePago: 'Manifiesto de Pasajeros'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '34',
            tipoComprobantePago: 'Documento del Operador'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '35',
            tipoComprobantePago: 'Documento del Partícipe'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '36',
            tipoComprobantePago: 'Recibo de Distribución de Gas Natural'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '37',
            tipoComprobantePago:
              'Documentos que emitan los concesionarios del servicio de revisiones técnicas vehiculares, por la prestación de dicho servicio'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '40',
            tipoComprobantePago: 'Comprobante de Percepción'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '41',
            tipoComprobantePago: 'Comprobante de Percepción - Venta interna'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '42',
            tipoComprobantePago:
              'Documentos emitidos por las empresas que desempeñan el rol adquiriente en los sistemas de pago mediante tarjetas de crédito emitidas por ellas mismas'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '43',
            tipoComprobantePago:
              'Boletos emitidos por las Compañías de Aviación Comercial que prestan servicios de transporte aéreo no regular de pasajeros y transporte aéreo especial de pasajeros.'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '44',
            tipoComprobantePago: 'Billetes de lotería, rifas y apuestas.'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '45',
            tipoComprobantePago:
              'Documentos emitidos por centros educativos y culturales, universidades, asociaciones y fundaciones, en lo referente a actividades no gravadas con tributos administrados por la SUNAT.'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '46',
            tipoComprobantePago:
              'Formulario de Declaración - pago o Boleta de pago de tributos Internos'
                .toUpperCase()
                .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '48',
            tipoComprobantePago: 'Comprobante de Operaciones - Ley N° 29972'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '49',
            tipoComprobantePago: 'Constancia de Depósito - IVAP (Ley 28211)'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '50',
            tipoComprobantePago: 'Declaración Única de Aduanas - Importación definitiva'
              .toUpperCase()
              .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '51',
            tipoComprobantePago: 'Póliza o DUI Fraccionada'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '52',
            tipoComprobantePago: 'Despacho Simplificado - Importación Simplificada'
              .toUpperCase()
              .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '53',
            tipoComprobantePago: 'Declaración de Mensajería o Courier'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '54',
            tipoComprobantePago: 'Liquidación de Cobranza'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '55',
            tipoComprobantePago: 'BVME para transporte ferroviario de pasajeros'
              .toUpperCase()
              .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '56',
            tipoComprobantePago: 'Comprobante de pago SEAE'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '87',
            tipoComprobantePago: 'Nota de Crédito Especial'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '88',
            tipoComprobantePago: 'Nota de Débito Especial'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '89',
            tipoComprobantePago: 'Nota de Ajuste de Operaciones - Ley N° 29972'
              .toUpperCase()
              .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '91',
            tipoComprobantePago: 'Comprobante de No Domiciliado'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '96',
            tipoComprobantePago: 'Exceso de crédito fiscal por retiro de bienes'
              .toUpperCase()
              .trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '97',
            tipoComprobantePago: 'Nota de Crédito - No Domiciliado'.toUpperCase().trim(),
            usuario: ':):)micky',
          },
          {
            idGrupoEmpresarial: '60f097ca53621708ecc4e781',
            idEmpresa: '60f097ca53621708ecc4e782',
            codigo: '98',
            tipoComprobantePago: 'Nota de Débito - No Domiciliado'.toUpperCase().trim(),
            usuario: ':):)micky',
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
      updated = await mTipoComprobantePago.findByIdAndUpdate(
        { _id: ge.idTipoComprobantePago },
        {
          idGrupoEmpresarial: ge.idGrupoEmpresarial,
          idEmpresa: ge.idEmpresa,
          codigo: ge.codigo.trim(),
          tipoComprobantePago: ge.tipoComprobantePago.toUpperCase().trim(),
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
    throw Error('Error while Paginating inBlock_TipoComprobantePago ::| ' + error);
  }
};
