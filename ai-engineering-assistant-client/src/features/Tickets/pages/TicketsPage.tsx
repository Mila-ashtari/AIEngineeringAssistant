import {
  Alert,
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
} from '@mui/material';
import { Link } from 'react-router';

import { useGetTicketsQuery, useDeleteTicketMutation } from '../api';

export default function TicketsPage() {
  const {
    data: tickets = [],
    isLoading,
    isError,
  } = useGetTicketsQuery();

  const [deleteTicket] = useDeleteTicketMutation();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load tickets.
      </Alert>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Development Tickets
      </Typography>
      <Button
  component={Link}
  to="/tickets/new"
  variant="contained"
>
  Create Ticket
</Button>

      {tickets.length === 0 && (
        <Typography>No tickets found.</Typography>
      )}

      <Stack spacing={2}>
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
            <Link
              to={`/tickets/${ticket.id}`}>
            <CardContent>
              <Typography variant="h6">
                {ticket.title}
              </Typography>

              <Typography color="text.secondary">
                {ticket.description}
              </Typography>

              <Typography variant="body2">
                Status: {ticket.status}
              </Typography>

              <Typography variant="body2">
                Priority: {ticket.priority}
              </Typography>
              <Button
                onClick={() => deleteTicket(ticket.id)}
                variant="outlined"
                color="error">
                Delete
              </Button>
            </CardContent>
            </Link>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}