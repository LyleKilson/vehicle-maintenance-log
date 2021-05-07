// api routes middleware goes into this file to be exported to controllers/index.js

const router = require("express").Router();

const ownerRoutes = require("./owner-routes");
const vehicleRoutes = require("./vehicle-routes");
const maintRoutes = require("./maintenance-routes");

router.use("/owners", ownerRoutes);
router.use("/vehicle", vehicleRoutes);
router.use("/maintlogs", maintRoutes);

module.exports = router;
