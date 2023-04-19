import mGrupoEmpresarial from '../models/grupoEmpresarial.model.js';

export const insertAlmacen = async (idGrupoEmpresarial, idEmpresa, nombre, direccion, telefono) => {
  try {
    console.log(`***********servi**********************************`);
    console.log(`//-->//--> insertAlmacen <--//<--//`);
    // console.log(`*****************************************`);
    console.log(`//-->//--> ${idGrupoEmpresarial}:  ${idEmpresa}: ${nombre}:`);
    let newGrupoEmpresarial = await mGrupoEmpresarial.updateOne(
      {
        _id: idGrupoEmpresarial,
        'empresas._id': idEmpresa,
      },
      {
        $push: {
          'empresas.$.almacenes': {
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
          },
        },
      }
    );
    console.log(`paso updateOne`);
    console.log(newGrupoEmpresarial);
    return newGrupoEmpresarial;
  } catch (error) {
    throw Error('Error while Paginating insertAlmacen');
  }
};
export const updateAlmacen2 = async (
  idGrupoEmpresarial,
  idEmpresa,
  idAlmacen,
  nombre,
  direccion,
  telefono
) => {
  try {
    console.log(`***********servi**********************************`);
    console.log(`//-->//--> updateAlmacen2 <--//<--//`);
    // console.log(`*****************************************`);
    console.log(`//-->//--> ${idGrupoEmpresarial}:  ${idEmpresa}: ${idAlmacen}:`);
    let newGrupoEmpresarial = await mGrupoEmpresarial.updateOne(
      {
        _id: idGrupoEmpresarial,
        // 'empresas._id': idEmpresa,
      },
      {
        'empresas.$.almacenes.$[idAlmacen].nombre': 'TT',
        // 'almacenes.$.direccion': direccion,
        // 'almacenes.$.telefono': telefono,
        // empresas.id(idEmpresa).usuarioCrea= 'ayer',
        // 'empresas.$[`idEmpresa`].usuarioCrea': 'ayer',
      }
    );
    console.log(`paso updateOne`);
    return newGrupoEmpresarial;
  } catch (error) {
    throw Error('Error while Paginating updateAlmacen2');
  }
};

export let updateAlmacen = async (
  idGrupoEmpresarial,
  idEmpresa,
  idAlmacen,
  nombre,
  direccion,
  telefono
) => {
  try {
    console.log(`***********servi**********************************`);
    console.log(`//-->//--> updateAlmacen <--//<--//`);
    // console.log(`*****************************************`);
    console.log(`//-->//--> ${idGrupoEmpresarial}:  ${idEmpresa}: ${idAlmacen}:`);
    // let newGrupoEmpresarial = await mGrupoEmpresarial.updateOne(
    //   {
    //     _id: idGrupoEmpresarial,
    //     'empresas._id': idEmpresa,
    //     'empresas.almacenes._id': idAlmacen,
    //   },
    //   {
    //     'almacenes.$.nombre': nombre,
    //     'almacenes.$.direccion': direccion,
    //     'almacenes.$.telefono': telefono,
    //   }
    // );
    console.log(`paso updateOne`);
    // console.log(newGrupoEmpresarial);
    // let pre = newGrupoEmpresarial.save();
    // console.log(`paso save`);
    // return pre;
    // let newEmpresa = await mGrupoEmpresarial.findOne({
    //   _id: idGrupoEmpresarial,
    //   // 'empresas._id': idEmpresa,
    //   // 'empresas.almacenes._id': idAlmacen,
    // });
    // console.log(`paso two`);
    let newGE = await mGrupoEmpresarial.findById({ _id: idGrupoEmpresarial }, function (e, data) {
      if (e) console.log(e);
      data.empresas.id(idEmpresa).almacenes.id(idAlmacen).nombre = nombre;
      data.empresas.id(idEmpresa).almacenes.id(idAlmacen).direccion = direccion;
      data.empresas.id(idEmpresa).almacenes.id(idAlmacen).telefono = telefono;
      data.save();
      // data.save(function (saveerr, saveresult) {
      //   if (!saveerr) {
      //     res.status(200).send(saveresult);
      //   } else {
      //     res.status(400).send(saveerr.message);
      //   }
      // });
    });
    // newAlmacen.empresas.id();
    // newEmpresa.empresas.agentePercepcion = true;
    console.log(`paso threee`);
    // console.log(newGE.empresa.id(idEmpresa));
    // console.log(`paso cuatro`);
    // const updated = newGE.save();
    // return updated; //almacenes
    // let newG = await mGrupoEmpresarial.findById({ _id: idGrupoEmpresarial });
    return newGE;
    // let newGE = await mGrupoEmpresarial.findOneAndUpdate(
    //   {
    //     _id: idGrupoEmpresarial,
    //   },
    //   {
    //     $set: {
    //       'almacenes.$.nombre': 'Seminario Luis',
    //     },
    //   }
    // );
  } catch (error) {
    throw Error('Error while Paginating updateAlmacen');
  }
};
