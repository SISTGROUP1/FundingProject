package com.sist.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import com.sist.web.dao.BoardDAO;
import com.sist.web.entity.Board;

@RestController
@CrossOrigin(origins = "*")
public class BoardRestController {
	@Autowired
	private BoardDAO bDao;
	
	@GetMapping("/board/list/{page}")
	public ResponseEntity<Map> boardList(@PathVariable("page") int page){
		Map map = new HashMap();
		try {
			List<Board> list = bDao.boardList(page);
			int count = (int)bDao.count();
			
			map.put("bList", list);
			map.put("count", count);
			
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
	
//	@GetMapping("/board/detail/{no}")
}
