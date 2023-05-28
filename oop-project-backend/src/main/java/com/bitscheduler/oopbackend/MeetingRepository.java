package com.bitscheduler.oopbackend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MeetingRepository extends MongoRepository <Meeting, String> {

}
