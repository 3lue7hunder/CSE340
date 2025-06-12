// Add this to your app.js file, BEFORE your routes
const utilities = require("./utilities/")

// Add JWT token verification middleware
app.use(utilities.checkJWTToken)

// Your existing routes should come AFTER this middleware
const invRoute = require("./routes/invRoute")
app.use("/inv", invRoute)

const accountRoute = require("./routes/accountRoute")
app.use("/account", accountRoute)