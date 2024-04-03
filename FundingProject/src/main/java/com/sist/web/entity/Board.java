package com.sist.web.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

/*
 * no int AI PK 
name varchar(51) 
subject varchar(1000) 
content text 
pwd varchar(10) 
regdate datetime 
hit int
 * */
@Entity(name = "jpaboard")
@Data
public class Board {
	@Id
	private int no;
	private String name,subject,content,pwd;
	@Column(insertable = true,updatable = false)
	private String regdate;
	@Column(insertable = true,updatable = false)
	private int hit;
}
