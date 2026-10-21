import {
  Alert,
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
} from '@mui/material';

import { useGetTicketsQuery } from '../api';

export default function TicketsPage() {
  const {
    data: tickets = [],
    isLoading,
    isError,
  } = useGetTicketsQuery();

  console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
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

      {tickets.length === 0 && (
        <Typography>No tickets found.</Typography>
      )}

      <Stack spacing={2}>
        {tickets.map((ticket) => (
          <Card key={ticket.id}>
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
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}