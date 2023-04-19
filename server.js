import express from 'express';
import morgan from 'morgan';
import { connect } from './database.js';
import path from 'path';
import cors from 'cors';
// import fetch from 'node-fetch';

import mongoose from 'mongoose';
//#region ENLACE DE RUTAS
import apisExternasRoute from './routes/apisExternas.route.js';
import kardexRoute from './routes/kardex.route.js';
import ventaRoute from './routes/venta.route.js';
import mercaderiaRoute from './routes/mercaderia.route.js';
import ingresosMercaderiasRoute from './routes/ingresosMercaderias.route.js';
import egresosMercaderiasRoute from './routes/egresosMercaderias.route.js';
import registrosAlmacenRoute from './routes/registroAlmacen.route.js';
import personaRoute from './routes/persona.route.js';
import grupoEmpresarialRoute from './routes/grupoEmpresarial.route.js';
import motivoINOUTAlmacenRoute from './routes/parameters/motivoINOUTalmacen.route.js';
import lineaTipoMercaderiaRoute from './routes/parameters/lineaTipoMercaderia.route.js';
import tipoDocumentoIngresoRoute from './routes/parameters/tipoDocumentoIngreso.route.js';
import tipoComprobantePagoRoute from './routes/parameters/tipoComprobantePago.route.js';
import tecnicoRoute from './routes/tecnico.route.js';
import vehiculoRoute from './routes/vehiculo.route.js';
import ordenServicioRoute from './routes/ordenServicio.route.js';
import servicioRoute from './routes/parameters/servicio.route.js';
import cotizacionRoute from './routes/cotizacion.route.js';
import usuarioRoute from './routes/usuario.route.js';
//#endregion ENLACE DE RUTAS

//
const conn = connect();
//
var app = express();

//Middlewares
// app.options('*', cors());
app.use(morgan('dev'));
app.use(express.json());
// const options = {
//   origin: ['http://localhost:3000', 'https://api.apis.net.pe/v1'],
//   credentials: true,
// };
// app.use(cors(options));
app.use(cors());
// routes
// app.use('/api/televisores', teleRoute);
//#region RUTAS
app.use('/api/apisExternas', apisExternasRoute);
app.use('/api/kardex', kardexRoute);
app.use('/api/mercaderia', mercaderiaRoute);
app.use('/api/venta', ventaRoute);
app.use('/api/ingresosMercaderias', ingresosMercaderiasRoute);
app.use('/api/egresosMercaderias', egresosMercaderiasRoute);
app.use('/api/registroAlmacen', registrosAlmacenRoute);
app.use('/api/grupoEmpresarial', grupoEmpresarialRoute);
app.use('/api/motivosINOUTAlmacen', motivoINOUTAlmacenRoute);
app.use('/api/lineaTipoMercaderia', lineaTipoMercaderiaRoute);
app.use('/api/tipoDocumentoIngreso', tipoDocumentoIngresoRoute);
app.use('/api/tipoComprobantePago', tipoComprobantePagoRoute);

app.use('/api/persona', personaRoute);
app.use('/api/tecnico', tecnicoRoute);
app.use('/api/vehiculo', vehiculoRoute);
app.use('/api/ordenServicio', ordenServicioRoute);
app.use('/api/servicio', servicioRoute);
app.use('/api/cotizacion', cotizacionRoute);

app.use('/api/usuario', usuarioRoute);
//#endregion RUTAS

app.listen(4000, () => console.log('Now browse to localhost:4000'));

export default conn;

// This sets up a route to localhost:3000/random and goes off and hits
// cat-fact.herokuapp.com/facts/random
// app.get('/:apiRoute', async (req, res) => {
//   try {
//     console.log('first', req.params);
//     const { apiRoute } = req.params;
//     const apiResponse = await fetch(
//       'https://api.apis.net.pe/v1/tipo-cambio-sunat?fecha=2021-06-23'
//     );
//     // const apiResponse = await fetch('https://cat-fact.herokuapp.com/facts/' + apiRoute);
//     const apiResponseJson = await apiResponse.json();
//     // await db.collection('collection').insertOne(apiResponseJson)
//     console.log(apiResponseJson);
//     res.send('Done – check console log');
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Something went wrong M');
//   }
// });

// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// app.get('/checkDobleAPI', async (req, res) => {
//   try {
//     // const apiResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const apiResponse = await fetch(
//       'https://api.apis.net.pe/v1/tipo-cambio-sunat?fecha=2021-06-23'
//     );
//     const apiResponseJson = await apiResponse.json();

//     console.log(apiResponseJson);
//     res.send('Running 🏃');
//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Something went wrong');
//   }
// });

//app.listen(3000, () => console.log(`Example app listening on port 3000!`));
