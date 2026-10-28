```javascript
// backend/src/models/Appointment.js
// Prisma schema definition for the Appointment model
module.exports = {
  schema: `
    model Appointment {
      id            Int      @id @default(autoincrement())
      start_time    DateTime
      end_time      DateTime
      provider_id   Int
      client_name   String
      status        String   @default("pending")
      created_at    DateTime @default(now())
      updated_at    DateTime @updated_at
    }
  `
};