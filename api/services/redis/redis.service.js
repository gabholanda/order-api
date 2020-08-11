const Redis = require("ioredis");
const redis = new Redis();

// clean all on reload
redis.flushall();

const set = async (order) => {
  if (order.id) {
    const redisOrder = await redis.set(
      `order:${order.id}`,
      JSON.stringify(order)
    );
    return redisOrder;
  }
};

const get = (id) => {
 return redis.get(`order:${id}`);
};

module.exports = {
  set,
  get,
};
