db.customers.aggregate([
  {
    $lookup: {
      from: 'orders',
      let: { customer_id: '$customer_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$$customer_id', '$customer_id'] } } },
        {
          $lookup: {
            from: 'orderitems',
            localField: 'order_id',
            foreignField: 'order_id',
            as: 'items',
          },
        },
      ],
      as: 'orders',
    },
  },
]);
