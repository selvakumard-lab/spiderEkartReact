const bcrypt = require("bcryptjs");
const db = require("../models");
const TenantMaster = db.TenantMaster;
const User = db.User;

exports.createTenant = async (req, res) => {
  try {
    const {
      company_name,
      client_name,
      domain_name,
      domain_url,
      project_slug,
      username,
      password,
      plan_id,
      start_date,
      end_date,
    } = req.body;

    /* -------------------- BASIC VALIDATION -------------------- */
    if (!company_name || !domain_name || !plan_id || !username || !password || !project_slug) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    /* -------------------- IMAGE VALIDATION -------------------- */
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Project image is required",
      });
    }

    // const project_image = req.file.path;
    const project_image = `uploads/projects/${req.file.filename}`;

    /* -------------------- DUPLICATE CHECKS -------------------- */
    // const existingDomain = await TenantMaster.findOne({
    //   where: { domain_name },
    // });

    // if (existingDomain) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "Domain name already exists",
    //   });
    // }

    const existingSlug = await TenantMaster.findOne({
      where: { project_slug },
    });

    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message: "Project slug already exists",
      });
    }

    const existingUsername = await TenantMaster.findOne({
      where: { username },
    });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    /* -------------------- PASSWORD HASH -------------------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name:client_name,
      email:username,
      password: hashedPassword,
      role:'client',
      project_slug
    });

    /* -------------------- CREATE TENANT -------------------- */
    const tenant = await TenantMaster.create({
      user_id: user.id,
      company_name,
      client_name,
      domain_name,
      domain_url,
      project_slug,
      username,
      password: hashedPassword,
      plan_id,
      start_date,
      end_date,
      project_image,
      status: "active",
    });

    return res.status(201).json({
      success: true,
      message: "Tenant created successfully",
      data: tenant,
    });

  } catch (error) {
    console.error("Create Tenant Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// exports.getTenants = async (req, res) => {
//   try {
//     const tenants = await TenantMaster.findAll();
//     res.status(200).json(tenants);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

exports.getTenants = async (req, res) => {
  const tenants = await TenantMaster.findAll({
    order: [["created_at", "DESC"]],
  });

  res.json({
    success: true,
    data: tenants,
  });
};


exports.getTenantById = async (req, res) => {
  try {
    const tenant = await TenantMaster.findByPk(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.status(200).json(tenant);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateTenant = async (req, res) => {
  try {
    const tenant = await TenantMaster.findByPk(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    const { company_name, domain_name, plan_id, status } = req.body;
    await tenant.update({ company_name, domain_name, plan_id, status });

    res.status(200).json({ message: "Tenant updated successfully", tenant });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteTenant = async (req, res) => {
  try {
    const tenant = await TenantMaster.findByPk(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    await tenant.destroy();
    res.status(200).json({ message: "Tenant deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
