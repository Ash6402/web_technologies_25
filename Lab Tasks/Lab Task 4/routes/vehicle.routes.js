const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/isAdmin");
const upload = require("../middlewares/upload");
const Vehicle = require("../models/Vehicle.model");

router.get('/', async (req, res) => {
    const vehicles = await Vehicle.find();
    res.render("vehicles/index", { title: "Vehicles", vehicles })
})

router.use(isAdmin)

router.get("/admin", async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render("vehicles/admin-list", { vehicles, title: "All Vehicles" });
});

router.get("/admin", async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render("vehicles/admin-list", { vehicles });
});

router.get("/admin/add", (req, res) => {
  res.render("vehicles/add", { title: "Add Vehicle", vehicle: null });
});

router.post("/admin/add", upload.single("image"), async (req, res) => {
  const { name, brand, price, type } = req.body;
  const image = req.file.filename;

  await Vehicle.create({ name, brand, price, type, image });
  req.flash("success", "Vehicle added");
  res.redirect("/vehicles/admin");
});

router.get("/admin/edit/:id", async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render("vehicles/edit", { title: "Edit Vehicle", vehicle });
});

router.post("/admin/edit/:id", upload.single("image"), async (req, res) => {
  const { name, brand, price, type } = req.body;
  const update = { name, brand, price, type };

  if (req.file) update.image = req.file.filename;

  await Vehicle.findByIdAndUpdate(req.params.id, update);
  req.flash("success", "Vehicle updated");
  res.redirect("/vehicles/admin");
});

router.post("/admin/delete/:id", async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  req.flash("success", "Vehicle deleted");
  res.redirect("/vehicles/admin");
});

module.exports = router;
