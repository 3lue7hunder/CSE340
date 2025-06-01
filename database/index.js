const { Pool } = require("pg")
require("dotenv").config()

/* ***************
 * Connection Pool with SSL support
 * Works in both development and production
 * *************** */
let pool

pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Added for troubleshooting queries during development
if (process.env.NODE_ENV == "development") {
  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params)
        console.log("executed query", { text })
        return res
      } catch (error) {
        console.error("error in query", { text })
        throw error
      }
    },
  }
} else {
  module.exports = pool
}
