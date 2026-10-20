import { api } from '../../services/api';
import type { Ticket } from './types';

export const ticketsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<Ticket[], void>({
      query: () => '/tickets',
      providesTags: ['Ticket'],
    }),
     getTicket: builder.query<Ticket[], void>({
      query: (id) => `/tickets/${id}`,
      providesTags: ['Ticket'],
    }),
    createTicket: builder.mutation<
      Ticket,
      Omit<Ticket, 'id'>
    >({
      query: (ticket) => ({
        url: '/tickets',
        method: 'POST',
        body: ticket,
      }),
      invalidatesTags: ['Ticket'],
    }),
  }),
});

export const { useGetTicketsQuery, useGetTicketQuery, useCreateTicketMutation } = ticketsApi;
