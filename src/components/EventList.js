import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/EventList.css';
import ConfirmModal from '../components/ConfirmModal';  // import the modal

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const openConfirmModal = (id) => {
    setEventToDelete(id);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setEventToDelete(null);
    setShowConfirmModal(false);
  };

  const confirmDelete = () => {
    axios.delete(`/events/${eventToDelete}`)
      .then(() => {
        setEvents(events.filter(e => e.id !== eventToDelete));
        closeConfirmModal();
      })
      .catch(err => {
        console.error("Error deleting event:", err);
        closeConfirmModal();
      });
  };

  return (
    <div className="event-list-container">
      <div className="header-section">
        <h2>
          <span className="header-icon">✨</span> Upcoming Events
        </h2>
        <button onClick={() => navigate('/add')} className="add-event-button">
          <span className="button-icon">➕</span> Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <p className="no-events-message">
          <span className="message-icon">🎉</span> No events planned yet. Let's create one!
        </p>
      ) : (
        <ul className="event-items-list">
          {events.map(event => (
            <li key={event.id} className="event-item">
              <div className="event-details">
                <span className="event-title">
                  <span className="event-icon">👥</span> {event.title}
                </span>
                <span className="event-date">
                  <span className="event-icon">🗓️</span> {event.date}
                </span>
                {event.location && (
                  <span className="event-location">
                    <span className="event-icon">📍</span> {event.location}
                  </span>
                )}
                {event.groups && event.groups.length > 0 && (
                  <div className="event-groups">
                    <span className="groups-label">Teams: </span>
                    {event.groups.map(group => (
                      <span key={group.id} className="group-name">
                        {group.name}{' '}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="event-actions">
                <button onClick={() => navigate(`/edit/${event.id}`)} className="edit-button">
                  <span className="button-icon">✏️</span> Edit
                </button>
                <button onClick={() => openConfirmModal(event.id)} className="delete-button">
                  <span className="button-icon">🗑️</span> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmModal
        isOpen={showConfirmModal}
        message="Êtes-vous sûr de vouloir supprimer cet événement ?"
        onConfirm={confirmDelete}
        onCancel={closeConfirmModal}
      />
    </div>
  );
};

export default EventList;
