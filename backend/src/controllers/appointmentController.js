const { PrismaClient } = require('@prisma/client');
const { syncWithGoogleCalendar } = require('../utils/googleCalendar');
const { sendEmail } = require('../mailer');

const prisma = new PrismaClient();

async function getAll(req, res) {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
}

async function create(req, res) {
  try {
    const { start_time, end_time, provider_id, client_name } = req.body;
    const appointment = await prisma.appointment.create({
      data: {
        start_time,
        end_time,
        provider_id,
        client_name,
        status: 'booked',
      },
    });

    // Optional: sync with Google Calendar and send confirmation email
    await syncWithGoogleCalendar(appointment);
    await sendEmail(appointment);

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const appointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data,
    });
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    await prisma.appointment.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};