package com.bitscheduler.oopbackend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FacilityRepository extends MongoRepository <Facility, String> {
}
