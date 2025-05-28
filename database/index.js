const { Pool } = require("pg")
require("dotenv").config()

let pool

if (process.env.NODE_ENV === "development") {
  // Use SSL with rejectUnauthorized false for local dev with e.g. Heroku Postgres
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })
} else {
  // Production environment - no SSL or different SSL config if needed
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
}

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("Executed query:", { text })
      return res.rows // Always return only rows array for easier handling
    } catch (error) {
      console.error("Error in query:", { text, error })
      throw error
    }
  },
}
