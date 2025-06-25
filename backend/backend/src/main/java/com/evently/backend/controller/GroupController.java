package com.evently.backend.controller;

import com.evently.backend.entity.Group;
import com.evently.backend.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;

    @GetMapping
    public List<Group> getAllGroups() {
        List<Group> groups = groupRepository.findAll();
        System.out.println(">> found " + groups.size() + " groups");
        return groups;
    }

}

