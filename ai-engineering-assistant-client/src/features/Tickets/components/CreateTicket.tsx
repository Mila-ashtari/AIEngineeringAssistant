
import { useState } from 'react';
import { Alert, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import TicketForm from './TicketForm';
import { useCreateTicketMutation } from  '../api';
import type { TicketInput } from '../types';

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const [createTicket, { isLoading }] =
    useCreateTicketMutation();

  const [error, setError] = useState('');

  async function handleCreate(values: TicketInput) {
    setError('');

    try {
      await createTicket(values).unwrap();
      navigate('/tickets');
    } catch {
      setError('Unable to create the ticket. Please try again.');
    }
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Create Ticket
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TicketForm
        onSubmit={handleCreate}
        isSubmitting={isLoading}
      />
    </Container>
  );
}
