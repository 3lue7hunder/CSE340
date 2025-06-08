// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

// Route to build inventory by classification view (public)
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Route to build listing of one item (public)
router.get(
  "/detail/:inventoryId",
  utilities.handleErrors(invController.buildByInventoryId)
)

// Protect the management view (must be Employee or Admin)
router.get(
  "/",
  utilities.checkJWTToken,
  utilities.checkLogin,
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildManagementView)
)

// Apply protection to all inventory management routes
router.use(
  ["/add-classification", "/add-inventory", "/edit/:inventory_id", "/update", "/delete/:inventory_id", "/delete"],
  utilities.checkJWTToken,
  utilities.checkLogin,
  utilities.checkEmployeeOrAdmin
)

// Classification Management
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Inventory Management
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// AJAX Inventory (optional: can leave public if used on public page)
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
)

// Update Item
router.get(
  "/edit/:inventory_id",
  utilities.handleErrors(invController.buildEditInventory)
)
router.post(
  "/update/",
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Delete Item
router.get(
  "/delete/:inventory_id",
  utilities.handleErrors(invController.buildDeleteInventory)
)
router.post(
  "/delete/",
  utilities.handleErrors(invController.deleteInventory)
)

const utilities = require("../utilities/") // or wherever your Util is exported

// Apply both login and authorization checks to admin-only routes
invRouter.get("/add-classification", 
  utilities.checkLogin, 
  utilities.checkEmployeeOrAdmin, 
  invController.buildAddClassification
);

// Same pattern for POST, DELETE, UPDATE admin endpoints
invRouter.post("/add-classification", 
  utilities.checkLogin, 
  utilities.checkEmployeeOrAdmin, 
  invController.addClassification
);

module.exports = router
