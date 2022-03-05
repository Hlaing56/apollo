const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const wagerSchema = new Schema(
  {
    wagerAmount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    house: {
      type: Number,
      get: function getRandomInt() {
        return Math.floor(Math.random() * 21);
      }
    },
    you: {
      type: Number,
      get: function getRandomInt() {
        return Math.floor(Math.random() * 20);
      }
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Wager = model('Wager', wagerSchema);

module.exports = Wager;
