import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/add" element={<EventForm />} />
        <Route path="/edit/:id" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App;
