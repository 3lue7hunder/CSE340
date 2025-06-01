const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by inventory ID
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inventory_id)
  const listing = await utilities.buildSingleListing(data[0])
  let nav = await utilities.getNav()
  const itemName = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`

  res.render("./inventory/listing", {
    title: itemName,
    nav,
    listing,
  })
}

/* ***************************
 *  Build Management View
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav()

  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  })
}

/* ***************************
 *  Build Add Classification View
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav();

  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  });
};

/* ***************************
 *  Add Classification
 * ************************** */
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;

  const response = await invModel.addClassification(classification_name);

  let nav = await utilities.getNav();
  if (response) {
    req.flash("notice", `The ${classification_name} classification was successfully added.`);
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      classification_name,
      errors: null,
    });
  } else {
    req.flash("notice", `Failed to add ${classification_name}`);
    res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      classification_name,
      errors: null,
    });
  }
};

/* ***************************
 *  Build Add Inventory View
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classifications = await utilities.buildClassificationList();

  res.render("inventory/add-inventory", {
    title: "Add Vehicle",
    nav,
    classifications,
    errors: null,
  });
};

/* ***************************
 *  Add Inventory
 * ************************** */
invCont.addInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classifications = await utilities.buildClassificationList();

  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body;

  const response = invModel.addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id);

  if (response) {
    req.flash("notice", `${inv_year} ${inv_make} ${inv_model} was added successfully.`)
    
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", `Failed to add ${inv_year} ${inv_make} ${inv_model}`)
    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      classifications,
      errors: null,
    });
  }
};

module.exports = invCont