package com.sist.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import com.sist.web.dao.SponsorDAO;
import com.sist.web.entity.Sponsor;

@RestController
@CrossOrigin(origins = "*")
public class SponsorRestController {
	@Autowired
	private SponsorDAO sDao;
	
//	@PostMapping("/sponsor/insert/{fno}")
//	public ResponseEntity<Map> sponsorInsert(@PathVariable("fno") int fno,@RequestBody Sponsor sponsor){
//		Map map = new HashMap();
//		
//		try {
//			
//		} catch (Exception e) {
//			// TODO: handle exception
//			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		
//		return new ResponseEntity<>(map,HttpStatus.OK);
//	}
}
