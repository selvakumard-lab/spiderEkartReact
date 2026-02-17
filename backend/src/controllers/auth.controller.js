// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { User } = require("../models");

// exports.login = async (req, res) => {

//     // try {
//         const { email, password } = req.body;
    
//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Email and password are required",
//             });
//         }

//         console.log("asdhfasdhasdahsds");

//         const user = await User.findOne({ where: { email } });

//         if (!user) {
//             return res.status(401).json({
//                 message: "Invalid email or passwordqqqqqqqqqqqqqqqq",
//             });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//         return res.status(401).json({
//             message: "Invalid email or password",
//         });
//         }

//         const token = jwt.sign(
//             {
//                 id: user.id,
//                 role: user.role,
//             },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         res.json({
//             token,
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//             },
//         });

//     // } catch (error) {
//     //     console.error(error);
//     //     res.status(500).json({
//     //         message: "Server error",
//     //     });
//     // }
// };


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { sendOtpMail } = require("../services/mail.service");
const db = require("../models");

const TenantMaster = db.TenantMaster;
const User = db.User;

const verifyCaptcha = async (token) => {
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
  );
  return response.data.success;
};


exports.sendOtp = async (req, res) => {
  try {
    const { email, captcha } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const human = await verifyCaptcha(captcha);
    if (!human)
      return res.status(400).json({ message: "Captcha failed" });

    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = 111111;
    const expireTime = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email,
        otp,
        otp_expire: expireTime,
      });
    } else {
      await user.update({
        otp,
        otp_expire: expireTime,
      });
    }

    await sendOtpMail(email, otp);

    res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "OTP send failed" });
  }
};


exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !user.otp)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.otp !== otp)
      return res.status(400).json({ message: "Wrong OTP" });

    if (new Date() > user.otp_expire)
      return res.status(400).json({ message: "OTP expired" });

    await user.update({
      otp: null,
      otp_expire: null,
      is_verified: true,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user,
      message: "Login successful",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Verification failed" });
  }
};















// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid Email credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid password credentials" });
//     }

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     return res.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         project_slug: user.project_slug,
//       },
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



exports.getTenantBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const tenant = await TenantMaster.findOne({ where: { project_slug:slug } });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Invalid Tenant",
      });
    }

    res.json({
      success: true,
      data: tenant,
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

