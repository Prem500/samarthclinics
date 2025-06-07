# Database Migration Instructions

## Overview

The appointment form has been simplified to include only the essential fields:

- Date for booking appointment
- Name
- Age
- Address
- Mobile number

The following fields have been removed:

- Visit type (clinic/home)
- Issue description

## Running Migrations

To update your existing database with these changes, follow these steps:

1. Make sure your server is not running
2. Navigate to the server directory:
   ```
   cd server
   ```
3. Run the migration script:
   ```
   npm run migrate
   ```
4. Start the server:
   ```
   npm run dev
   ```

## Changes Made

1. Added `age` and `address` fields to the User model
2. Removed `visitType` and `issue` fields from the Booking model
3. Updated all UI components to reflect these changes
4. Created database migrations to update existing records

## Important Notes

- Existing bookings will have their `visitType` and `issue` fields removed
- All users will get default values for the new fields
- The doctor dashboard has been updated to display age and address instead of issue
