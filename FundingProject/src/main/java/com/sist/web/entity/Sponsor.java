package com.sist.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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

}
