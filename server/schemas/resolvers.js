const { User, Wager } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { houseNum, youNum } = require('../utils/ranNum');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('wagers').sort({ coins: -1 });;
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('wagers').sort({ createdAt: -1 });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('wagers').sort({ createdAt: -1 });
  
        return userData;
      }
    
      throw new AuthenticationError('Not logged in');
    },
    wagers: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Wager.find(params).sort({ createdAt: -1 });
    },
    wager: async (parent, { _id }) => {
        return Wager.findOne({ _id });
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const line_items = [];

      
      const product = await stripe.products.create({
        name: "100 Coins",
        description: "100 more coins to give it another shot (limited to only once a week)"
      });

      const price = await stripe.prices.create({
        product:  product.id,
        unit_amount: 10 * 100,
        currency: 'usd',
      });

      line_items.push({
        price: price.id,
        quantity: 1
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/profile`,
        cancel_url: `${url}/`
      });

      return { session: session.id };

    }
  },
  Mutation: {
    signUp: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
    
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
    
      const token = signToken(user);
      return { token, user };
    },
    makeWager: async (parent, args, context) => {
      if (context.user) {
        const hNum = houseNum();

        const yNum = youNum();

        const wager = await Wager.create({ ...args, username: context.user.username, house: hNum, you: yNum });
    
        const user = await User.findById(context.user._id);

        var newAmount = 0;

        if (hNum > yNum){
          newAmount = user.coins - wager.wagerAmount;
        } else if (hNum < yNum){
          newAmount = user.coins + wager.wagerAmount;
        } else { 
          newAmount = user.coins;
        };

        await User.findByIdAndUpdate( 
          { _id: context.user._id },
          { $push: { wagers: wager._id }, $set: { coins: newAmount } },
          { new: true }
        );
        return wager;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;