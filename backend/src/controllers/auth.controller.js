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
// const { User } = require("../models");
const db = require("../models");
const TenantMaster = db.TenantMaster;
const User = db.User;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        project_slug: user.project_slug,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

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

