import { Routes, Route, Navigate } from 'react-router';
import TicketsPage from './features/tickets/pages/TicketsPage';
import TicketDetail from './features/tickets/pages/TicketDetail';
import CreateTicketPage from './features/tickets/components/CreateTicketPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tickets" replace />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/tickets/new" element={<CreateTicketPage />} />
      <Route path="/tickets/:id" element={<TicketDetail />} />
    </Routes>
  );
}