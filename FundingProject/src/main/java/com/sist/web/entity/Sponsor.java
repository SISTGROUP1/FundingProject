package com.sist.web.entity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.Data;

/*
 * CREATE TABLE sponsor(
	sno int auto_increment,
    name varchar(100),
    regdate datetime default now(),
    pay int,
    fno int,
    msg varchar(1000),
    PRIMARY KEY(sno)
);
 * 
 * */
@Entity
@Data
public class Sponsor {
	@Id
	private int sno;
	private String name,regdate,msg;
	private int pay,fno;
	
	@PrePersist
	public void regdate() {
		this.regdate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:MI:SS"));
	}

}
