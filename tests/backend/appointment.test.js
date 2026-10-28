```js
/**
 * Unit tests for the appointment controller.
 * Uses Jest with a mocked Prisma client.
 */

const { createAppointment, getAppointments, getAppointmentById, updateAppointment, deleteAppointment } = require('@/backend/src/controllers/appointmentController');
const { PrismaClient } = require('@prisma/client');

// Mock Prisma client
jest.mock('@/backend/src/models/Appointment');

const mockPrisma = {
  appointment: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('Appointment Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAppointment', () => {
    it('should create an appointment with valid data', async () => {
      const validData = {
        start_time: '2025-01-01T10:00:00Z',
        end_time: '2025-01-01T10:15:00Z',
        provider_id: 1,
        client_name: 'Jane Doe',
        status: 'scheduled',
      };

      const created = { id: 1, ...validData, start_time: new Date(validData.start_time), end_time: new Date(validData.end_time) };
      mockPrisma.appointment.create.mockResolvedValue(created);

      const result = await createAppointment(validData);
      expect(mockPrisma.appointment.create).toHaveBeenCalledWith({
        data: {
          start_time: new Date(validData.start_time),
          end_time: new Date(validData.end_time),
          provider_id: validData.provider_id,
          client_name: validData.client_name,
          status: validData.status,
        },
      });
      expect(result).toMatchObject(created);
    });

    it('should throw validation error when required fields are missing', async () => {
      const invalidData = {
        start_time: '2025-01-01T10:00:00Z',
        // missing end_time and client_name
        provider_id: 1,
        status: 'scheduled',
      };

      await expect(createAppointment(invalidData)).rejects.toThrow();
      expect(mockPrisma.appointment.create).not.toHaveBeenCalled();
    });
  });

  describe('getAppointments', () => {
    it('should return a list of appointments', async () => {
      const mockList = [
        { id: 1, start_time: new Date('2025-01-01T10:00:00Z'), end_time: new Date('2025-01-01T10:15:00Z'), provider_id: 1, client_name: 'Alice', status: 'scheduled' },
        { id: 2, start_time: new Date('2025-01-02T14:00:00Z'), end_time: new Date('2025-01-02T14:15:00Z'), provider_id: 2, client_name: 'Bob', status: 'completed' },
      ];
      mockPrisma.appointment.findMany.mockResolvedValue(mockList);

      const result = await getAppointments();
      expect(mockPrisma.appointment.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockList);
    });

    it('should support pagination parameters', async ()) => {
      const mockList = []; // empty for pagination test
      mockPrisma.appointment.findMany.mockResolvedValue(mockList);

      const result = await getAppointments({ skip: 0, take: 10 });
      expect(result).toEqual([]);
    });
  });

  describe('getAppointmentById', () => {
    it('should return an appointment when found', async () => {
      const mockApp = {
        id: 1,
        start_time: new Date('2025-01-01T10:00:00Z'),
        end_time: new Date('2025-01-01T10:15:00Z'),
        provider_id: 1,
        client_name: 'Charlie',
        status: 'scheduled',
      };
      mockPrisma.appointment.findUnique.mockResolvedValue(mockApp);

      const result = await getAppointmentById(1);
      expect(mockPrisma.appointment.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockApp);
    });

    it('should return null when appointment does not exist', async () => {
      mockPrisma.appointment.findUnique.mockResolvedValue(null);

      const result = await getAppointmentById(999);
      expect(result).toBeNull();
    });
  });

  describe('updateAppointment', () => {
    it('should update an existing appointment', async () => {
      const updateData = { start_time: '2025-01-01T11:00:00Z', end_time: '2025-01-01T11:15:00Z', status: 'completed' };
      const updated = { id: 1, ...updateData, start_time: new Date(updateData.start_time), end_time: new Date(updateData.end_time) };
      mockPrisma.appointment.update.mockResolvedValue(updated);

      const result = await updateAppointment(1, updateData);
      expect(mockPrisma.appointment.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
      expect(result).toEqual(updated);
    });

    it('should throw error if appointment not found', async () => {
      mockPrisma.appointment.update.mockResolvedValue(null);

      await expect(updateAppointment(999, { status: 'canceled' })).rejects.toThrow();
      expect(mockPrisma.appointment.update).toHaveBeenCalledWith({
        where: { id: 999 },
        data: { status: 'canceled' },
      });
    });
  });

  describe('deleteAppointment', () => {
    it('should delete an appointment', async () => {
      mockPrisma.appointment.delete.mockResolvedValue({});

      const result = await deleteAppointment(1);
      expect(mockPrisma.appointment.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual({});
    });

    it('should return null when attempting to delete non‑existent appointment', async () => {
      mockPrisma.appointment.delete.mockResolvedValue(null);

      const result = await deleteAppointment(999);
      expect(result).toBeNull();
    });
  });
});
```