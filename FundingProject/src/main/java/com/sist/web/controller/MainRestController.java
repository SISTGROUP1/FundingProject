package com.sist.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import com.sist.web.dao.FundingDAO;
import com.sist.web.entity.Funding;

@RestController
@CrossOrigin(origins = "*")
public class MainRestController {
	@Autowired
	private FundingDAO fDao;
	
	@GetMapping("/{start}")
	public ResponseEntity<Map> main_data(@PathVariable("start") int start){
		Map map = new HashMap();
		try {
			int rowSize = 20;
			int startpage = (rowSize*start)-(rowSize);
			List<Funding> fList = fDao.fundingMainData(startpage);
			int count = (int)fDao.count();
			int totalpage=(int)(Math.ceil(count/(double)rowSize));
			
			final int BLOCK=10;
			int startBlockNum=((start-1)/BLOCK*BLOCK)+1;
			int endBlockNum=((start-1)/BLOCK*BLOCK)+BLOCK;
			if(endBlockNum>totalpage) endBlockNum=totalpage;
			
			map.put("fList", fList);
			map.put("count", count);
			map.put("totalpage", totalpage);
			map.put("startBlockNum", startBlockNum);
			map.put("endBlockNum", endBlockNum);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
}
