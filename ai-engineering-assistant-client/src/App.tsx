import { Routes, Route, Navigate } from 'react-router';
import TicketsPage from './features/tickets/pages/TicketsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tickets" replace />} />
      <Route path="/tickets" element={<TicketsPage />} />
    </Routes>
  );
}

export default App;