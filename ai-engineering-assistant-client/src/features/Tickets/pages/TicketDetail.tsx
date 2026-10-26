import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router';

import { useGetTicketQuery } from '../api';

export default function TicketDetail() {
  const { id } = useParams();
  const ticketId = Number(id);
  const isValidTicketId = Number.isInteger(ticketId) && ticketId > 0;
  const {
    data: ticket,
    isLoading,
    isError,
  } = useGetTicketQuery(ticketId, { skip: !isValidTicketId });

  if (!isValidTicketId) {
    return <Alert severity="error">Invalid ticket ID.</Alert>;
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
    </Box>
  );
}
