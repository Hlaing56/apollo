const { User, Wager } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('wagers');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('wagers');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('wagers');
  
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
        const wager = await Wager.create({ ...args, username: context.user.username });
    
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { wagers: wager._id } },
          { new: true }
        );
    
        return wager;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;