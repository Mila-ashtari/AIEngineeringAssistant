
import { Navigate, Route, Routes } from 'react-router';

import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';

import TicketsPage from './features/tickets/pages/TicketsPage';
import TicketDetailsPage from './features/tickets/pages/TicketDetail';
import EditTicketPage from './features/tickets/pages/EditTicket';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/tickets/:id" element={<TicketDetailsPage />} />
        <Route path="/tickets/:id/edit" element={<EditTicketPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
