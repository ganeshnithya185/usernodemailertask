import User from "../Models/user.Schema.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mail from "../Services/nodemail.js";
import sendmail from "../Services/sendmail.js";
dotenv.config();
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashpassword });
    newUser.save();
    res
      .status(200)
      .json({ message: "User Registered successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Register failed" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const passwordmatch = await bcrypt.hash(password, user.password);
    if (!passwordmatch) {
      res.status(401).json({ message: "Invalid User" });
    }
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    mail();
    res.status(200).json({ message: "Login Successfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Register failed" });
  }
};

export const getloginUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUserbyId = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    sendmail(user, token);
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not Worked" });
  }
};

// export const resetPassword = async (req, res) => {
//   try {
//     console.log("resetpassword", resetPassword);
//     const { id } = req.params;
//     console.log("id", id);
//     const { password } = req.body;
//     console.log(password)
//     const user = await User.findById(id);
//     console.log("user", user)
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     const hashpassword = await bcrypt.hash(password, 10);
//     // console.log(hashpassword)
//     const newUser = new User({ password: hashpassword });

//     const userfind = await newUser.save();
//     console.log("userfind", userfind);

//     const newtoken = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//     console.log("newtoken", newtoken);
//     const result = await User.updateOne(
//       { _id: id },
//       { password: hashpassword }
//     );
//     console.log("result", result);
//     if (result.matchedCount === 0) {
//       return res.status(400).json({ message: "user not matched" });
//     }
//     const updateduser = await User.findById(id);
//     res.status(200).json({
//       message: "Updated Successfully",
//       data: updateduser,
//       token: newtoken,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Not Worked" });
//   }
// };
export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Error with token" });
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            User.findByIdAndUpdate(id, { password: hash })
              .then(() => res.json({ status: "Success" }))
              .catch((err) => res.status(500).json({ status: err }));
          })
          .catch((err) => res.status(500).json({ status: err }));
      }
    }); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Internal server error" });
  }
};

 