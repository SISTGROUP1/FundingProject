package com.sist.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
/*
 * fno int 
img text 
title text 
corp text 
funding text 
regdate text 
slide_img text 
detail_img text 
subtitle text
 * */
public class Funding {
	@Id
	private int fno;
	private String img,title,corp,funding,regdate,slide_img,detail_img,subtitle;
}
