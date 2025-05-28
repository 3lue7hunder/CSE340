const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * SSL configuration depending on environment
 * *************** */
let sslConfig = false;

// Enable relaxed SSL for development or when RELAX_SSL is explicitly true (e.g., Render)
if (process.env.NODE_ENV !== "production" || process.env.RELAX_SSL === "true") {
  sslConfig = {
    rejectUnauthorized: false,
  };
} else {
  // Enforce strict SSL in production with verified certificates
  sslConfig = {
    rejectUnauthorized: true,
  };
}

// Create connection pool with SSL configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
});

/**
 * Runs a SQL query and returns only the rows array for ease of use
 * @param {string} text - SQL query string
 * @param {Array} params - Optional array of parameters for parameterized query
 * @returns {Promise<Array>} - Promise resolving to rows returned from query
 */
async function query(text, params) {
  try {
    const res = await pool.query(text, params);
    console.log("executed query", { text });
    return res.rows;  // Return only rows for cleaner consumption
  } catch (error) {
    console.error("error in query", { text, error });
    throw error;
  }
}

module.exports = {
  query,
  // You can also export pool if you want direct access somewhere else
  pool,
};
