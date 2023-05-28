package com.bitscheduler.oopbackend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document ("facility")
public class Facility {
    @Id
    private String uid;

    private String roomName;
    private String bookedUid;
    private LocalDateTime savedAt;
    private LocalDateTime start;
    private LocalDateTime end;

    Facility (String roomName, String bookedUid, LocalDateTime start, LocalDateTime end) {
        this.start = start;
        this.roomName = roomName;
        this.end = end;
        this.bookedUid = bookedUid;
        this.savedAt = LocalDateTime.now();
    }
}
