
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

import { useGetTicketsQuery } from '../features/tickets/api';

export default function DashboardPage() {
  const {
    data: tickets = [],
    isLoading,
    isError,
  } = useGetTicketsQuery();

  if (isLoading) return <CircularProgress />;

  if (isError) {
    return <Alert severity="error">Unable to load dashboard data.</Alert>;
  }

  const stats = [
    { label: 'Total Tickets', count: tickets.length },
    {
      label: 'Open',
      count: tickets.filter((t) => t.status === 'Open').length,
    },
    {
      label: 'In Progress',
      count: tickets.filter((t) => t.status === 'In Progress').length,
    },
    {
      label: 'Closed',
      count: tickets.filter((t) => t.status === 'Closed').length,
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>


<Grid container spacing={3}>
  {stats.map((stat) => (
    <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }}>
      <Card
        sx={{
          height: '100%',
          border: '1px solid #E8ECF3',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {stat.label}
          </Typography>

          <Typography variant="h3">
            {stat.count}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

    </Box>
  );
}
