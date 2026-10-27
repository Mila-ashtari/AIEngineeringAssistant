
import {
  Alert, Box, Button, Card, CardContent,
  Chip, CircularProgress, Grid, Stack, Typography, 
} from '@mui/material';
import { Link } from 'react-router';
import { useGetTicketsQuery } from '../api';

export default function TicketsPage() {
  const { data: tickets = [], isLoading, isError } =
    useGetTicketsQuery();

  if (isLoading) return <CircularProgress />;
  if (isError) return <Alert severity="error">Unable to load tickets.</Alert>;

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{
          mb: 4,
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
      >
        <Box>
          <Typography variant="h4">Tickets</Typography>
          <Typography color="text.secondary">
            Manage your engineering issues
          </Typography>
        </Box>

        <Button component={Link} to="/tickets/new" variant="contained">
          + New Ticket
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {tickets.map((ticket) => (
          <Grid key={ticket.id} size={{ xs: 12, md: 6 }}>
            <Card sx={{
              height: '100%',
              border: '1px solid #E8ECF3',
              '&:hover': { borderColor: 'primary.main' },
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Typography color="text.secondary" variant="caption">
                    #{ticket.id}
                  </Typography>
                  <Chip label={ticket.status} size="small" />
                </Stack>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  {ticket.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ my: 2 }}
                >
                  {ticket.description}
                </Typography>

                <Stack direction="row" sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Chip label={`${ticket.priority} priority`}
                    size="small" variant="outlined" />
                  <Button component={Link}
                    to={`/tickets/${ticket.id}`} size="small">
                    View Details
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
