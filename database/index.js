const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * SSL required in production environment for DB host
 * *************** */

let pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Accept self-signed certs or unknown CA (common in cloud DBs)
    },
  });
} else {
  // For local development, you might disable SSL or set it similarly if your local DB supports SSL
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
  });
}

// Export a query function for consistency
module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      console.log("executed query", { text });
      return res;
    } catch (error) {
      console.error("error in query", { text, error });
      throw error;
    }
  },
};
