package com.bitscheduler.oopbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MeetingController {

    @Autowired
    private MeetingRepository meetingsRepository;

    @Autowired
    protected MongoTemplate mongoTemplate;

   

    @CrossOrigin(origins = {"http://localhost:3000"})
    @GetMapping ("/api/meeting/{title}")
    public Meeting Meeting (@PathVariable String title) {
        Query query = new Query(Criteria.where("title").is(title));
        return mongoTemplate.findOne(query, Meeting.class);
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    @GetMapping ("/api/meetings/{user_uid}")
    public List <Meeting> requests (@PathVariable String user_uid) {
        Query query = new Query(Criteria.where("senderUid").is(user_uid).andOperator(Criteria.where("pending").is(false)));
        return mongoTemplate.find(query, Meeting.class);
    }
    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping ("/api/meeting/{uid}/{title}/{description}/{start}/{end}")
    public Meeting EditMeeting (@PathVariable String uid, @PathVariable String title, @PathVariable String description, @PathVariable String start, @PathVariable String end) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        Meeting meeting = mongoTemplate.findOne(query, Meeting.class);
        meeting.setTitle(title);
        meeting.setDescription(description);
        meeting.setStart(start);
        meeting.setEnd(end);
        return meetingsRepository.save(meeting);
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    @GetMapping ("/api/all-meetings")
    public List <Meeting> allMeetings () {
        Query query = new Query();
        query.addCriteria(Criteria.where("pending").is(false));
        return mongoTemplate.find(query, Meeting.class);
    }

    

    @CrossOrigin (origins = "http://localhost:3000")
    @DeleteMapping("/api/delete-meetings/{meeting_uid}")
    public Meeting deleteMeetings (@PathVariable String meeting_uid) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(meeting_uid));
        return mongoTemplate.findAndRemove(query, Meeting.class);
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    @PostMapping ("/api/meetings")
    public Meeting createMeeting (@RequestBody Meeting requests) {
        return meetingsRepository.save(requests);
    }
}
