const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const tenantController = require("../controllers/tenant.controller");

// router.post("/", tenantController.createTenant);
// router.post("/",upload.single("project_image"),tenantController.createTenant);
router.post("/",upload("projects").single("project_image"),tenantController.createTenant);

router.get("/", tenantController.getTenants);
router.get("/:id", tenantController.getTenantById);
router.put("/:id", tenantController.updateTenant);
router.delete("/:id", tenantController.deleteTenant);

module.exports = router;
