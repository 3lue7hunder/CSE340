const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * PostgreSQL Connection Pool
 * SSL is required for production (Render-hosted databases).
 * This setup works for both local and deployed environments.
 * *************** */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Export a query helper for async/await syntax
const db = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      if (process.env.NODE_ENV === "development") {
        console.log("executed query", { text });
      }
      return res;
    } catch (error) {
      console.error("error in query", { text, error });
      throw error;
    }
  },
};

module.exports = db;
