
import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, "No file");
    }

   
    const result = await saveFileToCloudinary(req.file.buffer, req.user._id);
    if (!result) {
        throw createHttpError(500, "Failed to upload image");
    }


    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { avatar: result.secure_url },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
        throw createHttpError(404, "User not found");
    }

    res.status(200).json({ url: updatedUser.avatar });
  } catch (error) {
    next(error);
  }
};
