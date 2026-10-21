import { api } from '../../services/api';
import type { Ticket } from './types';

export const ticketsApi = api.injectEndpoints({
  endpoints: (builder) => ({
     getTickets: builder.query<Ticket[], void>({
      query: () => '/api/Ticket',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Ticket' as const,
                id,
              })),
              { type: 'Ticket' as const, id: 'LIST' },
            ]
          : [{ type: 'Ticket' as const, id: 'LIST' }],
    }),

    getTicket: builder.query<Ticket, number>({
      query: (id) => `/api/Ticket/${id}`,
      providesTags: (_result, _error, id) => [
        { type: 'Ticket', id },
      ],
    }),
    createTicket: builder.mutation<
      Ticket,
      Omit<Ticket, 'id'>
    >({
      query: (ticket) => ({
        url: '/api/Ticket',
        method: 'POST',
        body: ticket,
      }),
      invalidatesTags: ['Ticket'],
    }),

    updateTicket: builder.mutation<
      void,
      { id: number; ticket: TicketInput }
    >({
      query: ({ id, ticket }) => ({
        url: `/api/Ticket/${id}`,
        method: 'PUT',
        body: { ...ticket, id },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Ticket', id },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),

    deleteTicket: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/Ticket/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Ticket', id },
        { type: 'Ticket', id: 'LIST' },
      ],
    }),
  }),
});

export const { useGetTicketsQuery, useGetTicketQuery, useCreateTicketMutation, useUpdateTicketMutation, useDeleteTicketMutation } = ticketsApi;
