const express = require("express");
const router = express.Router();
const deliveryBoyController = require("../controllers/deliveryBoy.controller");

router.post('/', deliveryBoyController.create);
router.get('/', deliveryBoyController.getAll);
router.get('/:id', deliveryBoyController.getOne);
router.put('/:id', deliveryBoyController.update);
router.delete('/:id', deliveryBoyController.delete);


module.exports = router;
