package com.bitscheduler.oopbackend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("meetings")
public class Meeting {
    @Id
    private String uid;

    private String title;
    private String description;
    private LocalDateTime requestedAt;
    private String senderName;
    private boolean pending;
    private String senderUid;
    private String receiverUid;
    private String backgroundColor;
    private String start;
    private String end;

    Meeting (String title, String description, String backgroundColor, String senderName, boolean pending, String senderUid, String receiverUid, String start, String end) {
        this.title = title;
        this.description = description;
        this.requestedAt = LocalDateTime.now();
        this.pending = pending;
        this.senderName = senderName;
        this.senderUid = senderUid;
        this.backgroundColor = backgroundColor;
        this.receiverUid = receiverUid;
        this.start = start;
        this.end = end;
    }
}