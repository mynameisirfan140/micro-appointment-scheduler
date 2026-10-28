require('dotenv').config();
const express = require('express');
const cors = require('cors');
const appointmentsRouter = require('./routes/appointments');

const app = express();

app.use(cors());
app.use(express.json());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use('/appointments', appointmentsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});