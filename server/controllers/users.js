import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFreinds = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const frineds = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = frineds.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATe */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const frined = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      frined.friends = frined.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      frined.friends.push(friendId);
    }
    await user.save();
    await frined.save();

    const frineds = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = frineds.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
