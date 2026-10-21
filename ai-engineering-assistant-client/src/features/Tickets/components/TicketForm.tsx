
import { useState, type FormEvent } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import type { TicketInput } from '../types';

interface TicketFormProps {
  initialValues?: TicketInput;
  onSubmit: (values: TicketInput) => Promise<void>;
  isSubmitting: boolean;
}

const defaultValues: TicketInput = {
  title: '',
  description: '',
  status: 'Open',
  priority: 'Medium',
};

export default function TicketForm({
  initialValues = defaultValues,
  onSubmit,
  isSubmitting,
}: TicketFormProps) {
  const [values, setValues] = useState<TicketInput>(
    initialValues
  );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!values.title.trim()) return;

    await onSubmit(values);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600 }}
    >
      <Stack spacing={3}>
        <TextField
          label="Title"
          required
          value={values.title}
          onChange={(event) =>
            setValues({
              ...values,
              title: event.target.value,
            })
          }
        />

        <TextField
          label="Description"
          multiline
          rows={4}
          value={values.description}
          onChange={(event) =>
            setValues({
              ...values,
              description: event.target.value,
            })
          }
        />

        <TextField
          select
          label="Status"
          value={values.status}
          onChange={(event) =>
            setValues({
              ...values,
              status: event.target.value,
            })
          }
        >
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="In Progress">
            In Progress
          </MenuItem>
          <MenuItem value="Closed">Closed</MenuItem>
        </TextField>

        <TextField
          select
          label="Priority"
          value={values.priority}
          onChange={(event) =>
            setValues({
              ...values,
              priority: event.target.value,
            })
          }
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Ticket'}
        </Button>
      </Stack>
    </Box>
  );
}
