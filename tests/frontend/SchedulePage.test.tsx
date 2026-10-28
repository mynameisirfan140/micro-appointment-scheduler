```tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SchedulePage from '@/pages/schedule';
import '@testing-library/jest-dom';

// Mock the hook that fetches and mutates appointment data
jest.mock('@/hooks/useAppointment', () => ({
  useAppointment: jest.fn(),
}));

const mockCreateAppointment = jest.fn().mockResolvedValue({
  id: '1',
  start_time: '2025-01-01T10:00:00Z',
  end_time: '2025-01-01T10:15:00Z',
  provider_id: 'prov-1',
  client_name: 'John Doe',
  status: 'booked',
});

jest.mock('@/hooks/useAppointment', () => ({
  useAppointment: jest.fn(() => ({
    appointments: [
      {
        id: '1',
        start_time: '2025-01-01T09:00:00Z',
        end_time: '2025-01-01T09:15:00Z',
        provider_id: 'prov-1',
        client_name: 'Alice',
        status: 'open',
      },
    ],
    mutate: mockCreateAppointment,
    isLoading: false,
    isError: false,
  })),
}));

describe('SchedulePage', () => {
  it('renders existing appointments and allows successful form submission', async () => {
    render(<SchedulePage />);

    // Verify that at least one appointment is displayed initially
    expect(screen.getByText(/Alice/i)).toBeInTheDocument();

    // Fill out the appointment form
    const clientNameInput = screen.getByLabelText(/client name/i);
    await userEvent.type(clientNameInput, 'John Doe');

    const startTimeInput = screen.getByLabelText(/start time/i);
    await userEvent.type(startTimeInput, '2025-01-01T10:00');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    // Wait for the mutation to resolve and the new appointment to appear in the list
    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });

    // Ensure the createAppointment mock was called
    expect(mockCreateAppointment).toHaveBeenCalled();
  });
});
```