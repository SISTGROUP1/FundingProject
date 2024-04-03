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
import com.sist.web.dao.SponsorDAO;
import com.sist.web.entity.Funding;
import com.sist.web.entity.Sponsor;

@RestController
@CrossOrigin(origins = "*")
public class FundingRestController {
	@Autowired
	private FundingDAO fDao;
	
	@Autowired
	private SponsorDAO sDao;
	
	@GetMapping("/funding/detail/{fno}/{page}")
	public ResponseEntity<Map> funding_detail(@PathVariable("fno") int fno,@PathVariable("page") int page){
		Map map = new HashMap();
		try {
			Funding data = fDao.fundingDetailData(fno);
			String[] slide = data.getSlide_img().split("\\^");
			String[] detail = data.getDetail_img().split("\\^");
			int rowSize=5;
			int start=(page*rowSize)-rowSize;
			
			List<Sponsor> sList = sDao.sponsorListData(fno, start);
			int sPage = sDao.sponsorTotalCount(fno);
			int totalPage=(int)(Math.ceil(sPage/(double)rowSize));
			
			final int BLOCK=10;
			int startBlockNum=((page-1)/BLOCK*BLOCK)+1;
			int endBlockNum=((page-1)/BLOCK*BLOCK)+BLOCK;
			if(endBlockNum>totalPage) endBlockNum=totalPage;
			
			map.put("data", data);
			map.put("slide", slide);
			map.put("detail", detail);
			map.put("sList", sList);
			map.put("sPage", sPage);
			map.put("startBlockNum", startBlockNum);
			map.put("endBlockNum", endBlockNum);
			map.put("totalpage", totalPage);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
	
	@GetMapping("/funding/find/{page}/{fd}")
	public ResponseEntity<Map> fundig_find(@PathVariable("page") int page,@PathVariable("fd") String fd){
		Map map = new HashMap();
		try {
			int rowSize = 20;
			int start = (rowSize*page)-(rowSize);
			List<Funding> fList = fDao.fundingFindData(fd, start);
			int count = fDao.fundingFindCount(fd);
			map.put("fList", fList);
			map.put("count", count);
			
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
}
