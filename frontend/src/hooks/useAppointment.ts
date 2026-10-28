import { useState, useEffect, useCallback } from 'react';

export interface Appointment {
  id: number;
  start_time: string;
  end_time: string;
  provider_id: number;
  client_name: string;
  status: string;
}

export interface UseAppointmentResult {
  appointments: Appointment[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  createAppointment: (appointment: Omit<Appointment, 'id'>) => Promise<void>;
  deleteAppointment: (id: number) => Promise<void>;
  updateAppointment: (id: number, appointment: Omit<Appointment, 'id'>) => Promise<void>;
}

export default function useAppointment(): UseAppointmentResult {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/appointments');
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to fetch appointments');
      }
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAppointment = useCallback(
    async (appointment) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appointment),
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to create appointment');
        }
        const data = await res.json();
        // Refresh list after creation
        await fetchAppointments();
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsError(true);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAppointments]
  );

  const deleteAppointment = useCallback(
    async (id) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/appointments/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to delete appointment');
        }
        await fetchAppointments();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsError(true);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAppointments]
  );

  const updateAppointment = useCallback(
    async (id, appointment) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/appointments/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(appointment),
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Failed to update appointment');
        }
        await fetchAppointments();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsError(true);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAppointments]
  );

  // Fetch on mount
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    isLoading,
    isError,
    error,
    createAppointment,
    deleteAppointment,
    updateAppointment,
  };
}