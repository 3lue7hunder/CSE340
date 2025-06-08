// routes/invRoute.js
const express = require("express")
const router = new express.Router()
const invCont = require("../controllers/invController")
const utilities = require("../utilities")

// Management Dashboard (Admin & Employee only)
router.get(
  "/",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invCont.buildManagementView)
)

// Other routes (if needed, protected as well)
router.get(
  "/add-classification",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invCont.buildAddClassification)
)

router.get(
  "/add-inventory",
  utilities.checkLogin,
  utilities.checkAccountType,
  utilities.handleErrors(invCont.buildAddInventory)
)

module.exports = router
