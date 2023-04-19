const { Schema } = (mongoose = require('mongoose'));

// URI including the name of the replicaSet connecting to
// const uri = 'mongodb://localhost:27017/trandemo?replicaSet=fresh';
const uri =
  'mongodb+srv://presto:presto123@cluster0.4yfbt.mongodb.net/almacen_bd2?retryWrites=true&w=majority';
const opts = { useNewUrlParser: true };

// sensible defaults
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// schema defs

const orderSchema = new Schema({
  name: String,
});

const orderItemsSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  itemName: String,
  price: Number,
});

const Order = mongoose.model('Order', orderSchema);
const OrderItems = mongoose.model('OrderItems', orderItemsSchema);

// log helper

const log = (data) => console.log(JSON.stringify(data, undefined, 2));

// main

(async function () {
  try {
    const conn = await mongoose.connect(uri, opts);

    // clean models
    await Promise.all(Object.entries(conn.models).map(([k, m]) => m.deleteMany()));

    let session = await conn.startSession();
    session.startTransaction();

    // Collections must exist in transactions
    await Promise.all(Object.entries(conn.models).map(([k, m]) => m.createCollection()));

    let [order, other] = await Order.insertMany([{ name: 'Bill' }, { name: 'Ted' }], { session });

    let fred = new Order({ name: 'Fred' });
    await fred.save({ session });

    let items = await OrderItems.insertMany(
      [
        { order: order._id, itemName: 'Cheese', price: 1 },
        { order: order._id, itemName: 'Bread', price: 2 },
        { order: order._id, itemName: 'Milk', price: 3 },
      ],
      { session }
    );

    // update an item
    let result1 = await OrderItems.updateOne(
      { order: order._id, itemName: 'Milk' },
      { $inc: { price: 1 } },
      { session }
    );
    log(result1);

    // commit
    await session.commitTransaction();

    // start another
    session.startTransaction();

    // Update and abort
    let result2 = await OrderItems.findOneAndUpdate(
      { order: order._id, itemName: 'Milk' },
      { $inc: { price: 1 } },
      { new: true, session }
    );
    log(result2);

    await session.abortTransaction();

    /*
     * $lookup join - expect Milk to be price: 4
     *
     */

    let joined = await Order.aggregate([
      { $match: { _id: order._id } },
      {
        $lookup: {
          from: OrderItems.collection.name,
          foreignField: 'order',
          localField: '_id',
          as: 'orderitems',
        },
      },
    ]);
    log(joined);
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }
})();
