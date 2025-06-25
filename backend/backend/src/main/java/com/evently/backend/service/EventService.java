package com.evently.backend.service;

import com.evently.backend.entity.Event;
import com.evently.backend.entity.Group;
import com.evently.backend.repository.EventRepository;
import com.evently.backend.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private GroupRepository groupRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Event createEvent(Event event) {
        if (event.getGroups() != null && !event.getGroups().isEmpty()) {
            Set<Group> groups = event.getGroups().stream()
                    .map(group -> groupRepository.findById(group.getId())
                            .orElseThrow(() -> new RuntimeException("Group not found: " + group.getId())))
                    .collect(Collectors.toSet());
            event.setGroups(groups);
        }

        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        Event existing = getEventById(id);
        existing.setTitle(updatedEvent.getTitle());
        existing.setDate(updatedEvent.getDate());
        existing.setLocation(updatedEvent.getLocation());

        if (updatedEvent.getGroups() != null) {
            Set<Long> groupIds = updatedEvent.getGroups().stream()
                    .map(Group::getId)
                    .collect(Collectors.toSet());
            Set<Group> groups = groupRepository.findAllById(groupIds).stream().collect(Collectors.toSet());
            existing.setGroups(groups);
        }

        return eventRepository.save(existing);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
