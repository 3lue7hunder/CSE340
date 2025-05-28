// inventory-model.js

const db = require("../database");  // Import the whole object

/**
 * Get all classification records from the database.
 * @returns {Promise<Array>} List of classification objects.
 */
async function getClassifications() {
  try {
    const rows = await db.query(
      "SELECT * FROM public.classification ORDER BY classification_name"
    );
    return rows;  // rows returned directly by db.query()
  } catch (error) {
    console.error("getClassifications error:", error);
    throw error;
  }
}

/**
 * Get inventory items with their classification names by classification_id.
 * @param {number} classification_id 
 * @returns {Promise<Array>} List of inventory objects.
 */
async function getInventoryByClassificationId(classification_id) {
  try {
    const rows = await db.query(
      `SELECT * FROM public.inventory AS i 
       JOIN public.classification AS c 
       ON i.classification_id = c.classification_id 
       WHERE i.classification_id = $1`,
      [classification_id]
    );
    return rows;
  } catch (error) {
    console.error("getInventoryByClassificationId error:", error);
    throw error;
  }
}

/**
 * Get a single inventory item by its inventory_id.
 * @param {number} inventory_id 
 * @returns {Promise<Object>} Inventory object.
 */
async function getInventoryByInventoryId(inventory_id) {
  try {
    const rows = await db.query(
      `SELECT * FROM public.inventory AS i
       JOIN public.classification AS c
       ON i.classification_id = c.classification_id
       WHERE inv_id = $1`,
      [inventory_id]
    );
    return rows[0]; // return single item
  } catch (error) {
    console.error("getInventoryByInventoryId error:", error);
    throw error;
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryByInventoryId,
};
