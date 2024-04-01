package com.sist.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.dao.FundingDAO;
import com.sist.web.entity.Funding;

@RestController
@CrossOrigin(origins = "*")
public class FundingRestController {
	@Autowired
	private FundingDAO fDao;
	
	@GetMapping("/funding/detail/{fno}")
	public ResponseEntity<Funding> funding_detail(@PathVariable("fno") int fno){
		Funding data = new Funding();
		try {
			data = fDao.fundingDetailData(fno);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(data,HttpStatus.OK);
	}
}
