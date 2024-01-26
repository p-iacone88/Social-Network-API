const { Thought, User, Reaction } = require('../models');
const { Types } = require('mongoose');

// Controller object containing functions for handling thought-related operations
const ThoughtController = {
  // Function to get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts); // Respond with thoughts if found
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to get a thought by ID
  async getThoughtsById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to create a new thought
  async createThought(req, res) {
    try {
      // require valid user
      const userData = await User.findOne(
        { username: req.body.username }
      );
      if (!userData) {
        res.json('No user with this username!');
        return;
      }
      const thought = await Thought.create(req.body);

      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json('No user with this username');
    }
  },
  // Function to delete a thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to update a thought by ID
  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Function to create a reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ message: notFound });
    } catch (e) {
      res.status(500).json(e);
    }
  },
  // Function to delete a reaction for a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      thought ? res.json(thought) : res.status(404).json({ message: notFound });
    } catch (e) {
      res.status(500).json(e);
    }
  },

};

module.exports = ThoughtController;

