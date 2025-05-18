-- Insert a new user account into the account table
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');




-- Update Tony Stark's account to make him an Admin
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';




-- Delete the Tony Stark account
DELETE FROM account
WHERE account_email = 'tony@starkent.com';




-- Replace 'small interiors' with 'a huge interior' for Hummer models
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';




-- Show make, model, and classification name for Sport vehicles
SELECT inv_make, inv_model, classification_name
FROM inventory
INNER JOIN classification
ON inventory.classification_id = classification.classification_id
WHERE classification_name = 'Sport';




-- Update all image paths to include /vehicles/
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');