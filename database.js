import mongoose from 'mongoose';

export const CONNECTION_URL =
  'mongodb+srv://presto:presto123@cluster0.4yfbt.mongodb.net/almacen_bd2?retryWrites=true&w=majority';

export async function connect() {
  try {
    //const db =
    await mongoose.connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // const session = await db.startSession();
    // return session();
    console.log('>>> BD on line: ', new Date());
  } catch (error) {
    console.log('Algo salio mal al conectar la BD.');
    console.log(error);
  }
}
