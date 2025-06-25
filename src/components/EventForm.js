import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/api';  
import '../styles/EventForm.css';
import ReactSelect from 'react-select';

const EventForm = () => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    groups: [] 
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [availableGroups, setAvailableGroups] = useState([]);

  const groupOptions = availableGroups.map(g => ({ value: g.id, label: g.name }));
  const selectedGroups = groupOptions.filter(option => form.groups.includes(option.value));

  useEffect(() => {
    axios.get('/groups')
      .then(res => {
        setAvailableGroups(res.data);
      })
      .catch(err => console.error("❌ Error loading groups", err));
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`/events/${id}`)
        .then(res => {
          const eventData = res.data;
          const groupIds = eventData.groups ? eventData.groups.map(g => g.id) : [];
          setForm({
            ...eventData,
            groups: groupIds,
          });
        })
        .catch(err => console.error("Error fetching event:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGroupSelectChange = (selectedOptions) => {
    const selectedIds = selectedOptions ? selectedOptions.map(o => o.value) : [];
    setForm({ ...form, groups: selectedIds });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required.';
    if (!form.date) newErrors.date = 'Date is required.';
    if (form.groups.length === 0) newErrors.groups = 'Please select at least one group.';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    const groupsPayload = form.groups.map(id => ({ id }));

    const payload = {
      ...form,
      groups: groupsPayload,
    };

    const request = id
      ? axios.put(`/events/${id}`, payload)
      : axios.post('/events', payload);

    request
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(err => {
        setLoading(false);
        console.error("Error saving event:", err.response || err);
        alert('Failed to save event.');
      });
  };

  return (
    <div className="event-form-container">
      <form onSubmit={handleSubmit} className="event-form" noValidate>
        <h2>{id ? 'Edit Event' : 'Add New Event'}</h2>

        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Team Meeting"
            className={`form-input ${errors.title ? 'input-error' : ''}`}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="groups">Select Groups</label>
          <ReactSelect
            id="groups"
            isMulti
            options={groupOptions}
            value={selectedGroups}
            onChange={handleGroupSelectChange}
            classNamePrefix={errors.groups ? 'select-error' : 'react-select'}
            placeholder="Choose one or more groups"
          />
          {errors.groups && <span className="error-message">{errors.groups}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={`form-input ${errors.date ? 'input-error' : ''}`}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g., Conference Room A"
            className="form-input"
          />
        </div>

        <button type="submit" className="save-button" disabled={loading}>
          {loading ? "Saving..." : id ? 'Update Event' : 'Add Event'}
        </button>

        <button type="button" onClick={() => navigate('/')} className="cancel-button">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EventForm;
