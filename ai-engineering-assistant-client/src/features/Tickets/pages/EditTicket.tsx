
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';

import TicketForm from '../components/TicketForm';
import {
  useGetTicketQuery,
  useUpdateTicketMutation,
} from '../api';
import type { TicketInput } from '../types';

export default function EditTicketPage() {
  const { id } = useParams();
  const ticketId = Number(id);
  const navigate = useNavigate();

  const validId = Number.isInteger(ticketId) && ticketId > 0;

  const { data: ticket, isLoading, isError } =
    useGetTicketQuery(ticketId, { skip: !validId });

  const [updateTicket, { isLoading: isSaving, isError: isUpdateError }] =
    useUpdateTicketMutation();

 

  async function handleUpdate(values: TicketInput) {

    try {
      await updateTicket({
        id: ticketId,
        ticketInput: values,
      }).unwrap();

      navigate(`/tickets/${ticketId}`);
    } catch {
   
    }
  }

  if (!validId) return <Alert severity="error">Invalid ticket ID.</Alert>;
  if (isLoading) return <CircularProgress />;
  if (isError || !ticket) {
    return <Alert severity="error">Ticket could not be loaded.</Alert>;
  }

  const initialValues: TicketInput = {
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
  };

  return (
    <Box>
      <Button component={Link} to={`/tickets/${ticketId}`} sx={{ mb: 2 }}>
        Back to ticket
      </Button>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Edit Ticket #{ticketId}
      </Typography>

      {isUpdateError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Unable to update the ticket.
        </Alert>
      )}

      <TicketForm
        key={ticket.id}
        initialValues={initialValues}
        onSubmit={handleUpdate}
        isSubmitting={isSaving}
      />
    </Box>
  );
}
