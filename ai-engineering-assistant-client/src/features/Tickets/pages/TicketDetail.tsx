import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router';

import { useDeleteTicketMutation, useGetTicketQuery } from '../api';

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ticketId = Number(id);
  const isValidTicketId = Number.isInteger(ticketId) && ticketId > 0;
  const {
    data: ticket,
    isLoading,
    isError,
  } = useGetTicketQuery(ticketId, { skip: !isValidTicketId });

  const [
    deleteTicket,
    { isLoading: isDeleting, isError: isDeleteError },
  ] = useDeleteTicketMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleDelete() {
    try {
      await deleteTicket(ticketId).unwrap();
      navigate('/tickets');
     }
     catch {
      // Error handling is done via isDeleteError state
    }
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !ticket) {
    return (
      <Alert severity="error">
        Ticket not found or could not be loaded.
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button component={Link} to="/tickets" sx={{ mb: 2 }}>
        Back to tickets
      </Button>

      <Typography variant="h4" gutterBottom>
        {ticket.title}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Chip label={ticket.status} color="primary" variant="outlined" />
        <Chip label={ticket.priority} variant="outlined" />
      </Stack>

      <Typography variant="subtitle2" color="text.secondary">
        Description
      </Typography>
      <Typography sx={{ mt: 1, mb: 4, whiteSpace: 'pre-wrap' }}>
        {ticket.description}
      </Typography>

      <Stack direction="row" spacing={2}>
         <Button
          component={Link}
          to={`/tickets/${ticket.id}/edit`}
          variant="contained"
        >
          Edit Ticket
        </Button>
        <Button
          color="error"
          variant="outlined"
          onClick={() => setConfirmOpen(true)}
        >
          Delete Ticket
        </Button>
        {isDeleteError && (
          <Alert severity="error">
            Unable to delete the ticket. Please try again.
          </Alert>
        )}
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>Delete ticket?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This action cannot be undone. Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              color="error"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Box>
  );
}
