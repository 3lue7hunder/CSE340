const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
        const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
        return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
        return error.message
    }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email, excludedEmail = null){
    try {
        if(excludedEmail) {
            const sql = "SELECT * FROM account WHERE account_email = $1 AND account_email != $2"
            const email = await pool.query(sql, [account_email, excludedEmail])
            return email.rowCount
        }
        else {
            const sql = "SELECT * FROM account WHERE account_email = $1"
            const email = await pool.query(sql, [account_email])
            return email.rowCount
        }
    } catch (error) {
        return error.message
    }
}


/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail(account_email) {
    try {
        const result = await pool.query(
            'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
            [account_email]);
        
        // Return the first row if found, or null if not found
        return result.rows[0] || null;
    } catch (error) {
        console.error("Database error in getAccountByEmail:", error);
        throw new Error("Database error occurred");
    }
}

/* *****************************
* Return account data using id
* ***************************** */
async function getAccountById(account_id) {
    try {
        const result = await pool.query(
            'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_id = $1',
            [account_id]);
            return result.rows[0];
    } catch (error) {
        return new Error("No matching account was found");
    }
}

/* *****************************
* Send query to update account
* ***************************** */
async function updateAccount(account_id, account_firstname, account_lastname, account_email) {
    try {
        const sql = "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4";
        const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_id]);
        return result;
    } catch(error) {
        return new Error("Update failed. Please try again.");
    }
}

/* *****************************
* Send query to update password
* ***************************** */
async function updatePassword(account_id, hashed_password) {
    try {
        const sql = "UPDATE account SET account_password = $1 WHERE account_id = $2";
        const result = await pool.query(sql, [hashed_password, account_id]);
        return result;
    } catch(error) {
        return new Error("Password Update Failed. Please try again.");
    }
}

module.exports = { registerAccount, checkExistingEmail, getAccountByEmail, getAccountById, updateAccount, updatePassword }