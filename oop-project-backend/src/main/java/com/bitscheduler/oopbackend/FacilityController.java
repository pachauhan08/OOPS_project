package com.bitscheduler.oopbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RestController
public class FacilityController {
    @Autowired
    private FacilityRepository facilityRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping("/api/facility/all/{roomName}")
    public List<Facility> getAllBookings (@PathVariable String roomName) {
        Query query = new Query ();
        query.addCriteria (Criteria.where("roomName").is(roomName));
        return mongoTemplate.find(query, Facility.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping("/api/facility/{uid}")
    public List<Facility> getUserBookings (@PathVariable String uid) {
        Query query = new Query ();
        query.addCriteria (Criteria.where("bookedUid").is(uid));
        return mongoTemplate.find(query, Facility.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PostMapping("/api/facility")
    public Facility createBookings (@RequestBody Facility booking) {
        return facilityRepository.save(booking);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @DeleteMapping ("/api/facility/delete/{uid}")
    public List<Facility> deleteBookings (@PathVariable String uid) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        return mongoTemplate.findAllAndRemove(query, Facility.class);
    }
}
