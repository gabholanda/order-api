const Order = require("../../models/Order");
const redis = require("../redis/redis.service");

const addOrder = (req, res) => {
  const { id, amount, phoneNumber, createdDate } = req.body;

  const newOrder = new Order({
    id: id,
    amount: parseFloat(amount),
    phoneNumber: phoneNumber,
    createdDate: createdDate,
  });
  newOrder.save(async (error, doc) => {
    try {
      if (error) throw new Error(error);
      else {
        const data = await redis.set(doc);
        if (data === "OK") return res.json(doc).status(200);
        else
          return res
            .json({ message: "Something unexpected happened with Redis" })
            .status(500);
      }
    } catch (error) {
      console.error(error);
    }
  });
};

const findOne = (req, res) => {
  const { id, phoneNumber } = req.query;
  redis.get(id).then((data) => {
    if (data) {
      const unserealizedData = JSON.parse(data);
      return res.json(unserealizedData).status(200);
    } else {
      Order.findOne({ id: id, phoneNumber: phoneNumber }, (error, doc) => {
        if (error) throw new Error(error);
        else if (doc) return res.json(doc).status(200);
        else return res.status(404).json({ message: "Order not found" });
      });
    }
  });

  return res.status(200);
};

module.exports = {
  addOrder,
  findOne,
};
