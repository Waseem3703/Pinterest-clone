import express from 'express';
import { Pin } from '../models/CreatePin.js';  // Adjust according to your model
import { User } from '../models/UserModel.js';  // Adjust according to your model

const router = express.Router();

// Admin route to fetch summary data
router.get('/admin', async (req, res) => {
  try {
    // Fetch the total number of users
    const totalUsers = await User.countDocuments();

    // Fetch the total number of pins
    const totalPins = await Pin.countDocuments();

    // Fetch the 5 most recent pins
    const recentPins = await Pin.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt');

    // Count total comments across all pins
    const allPins = await Pin.find({}, 'comments');
    const totalComments = allPins.reduce((sum, pin) => sum + pin.comments.length, 0);

    // Get followers and following data
    const users = await User.find({}, 'follower following');
    let totalFollowers = 0;
    let totalFollowing = 0;
    users.forEach(user => {
      totalFollowers += user.follower.length;
      totalFollowing += user.following.length;
    });

    // Respond with the aggregated data
    res.json({
      totalUsers,
      totalPins,
      totalComments,
      totalFollowers,
      totalFollowing,
      recentPins,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
