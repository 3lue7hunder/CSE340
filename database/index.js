const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * SSL configuration depending on environment
 * *************** */
let pool;

if (process.env.NODE_ENV === "development") {
  // In development, allow self-signed certs (useful for local testing)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // In production, enforce SSL without rejectUnauthorized false
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      // If your production DB requires SSL, you can specify options here
      rejectUnauthorized: true,
    },
  });
}

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
    return res.rows;  // <-- Return only rows for cleaner consumption
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
