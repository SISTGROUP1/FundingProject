package com.sist.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
			int rowSize=10;
			int start=(page*rowSize)-rowSize;
			List<Board> list = bDao.boardList(start);
			int count = (int)bDao.count();
			int totalPage=(int)(Math.ceil(count/(double)rowSize));
			
			final int BLOCK=10;
			int startBlockNum=((page-1)/BLOCK*BLOCK)+1;
			int endBlockNum=((page-1)/BLOCK*BLOCK)+BLOCK;
			if(endBlockNum>totalPage) endBlockNum=totalPage;
			
			map.put("bList", list);
			map.put("count", count);
			map.put("totalpage", totalPage);
			map.put("startBlockNum", startBlockNum);
			map.put("endBlockNum", endBlockNum);
			
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(map,HttpStatus.OK);
	}
	
	@GetMapping("/board/detail/{no}")
	public ResponseEntity<Board> boardDetail(@PathVariable("no") int no){
		Board board = new Board();
		try {
			board = bDao.findByNo(no);
			board.setHit(board.getHit()+1);
			bDao.save(board);
			board = bDao.findByNo(no);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(board,HttpStatus.OK);
	}
	@PostMapping("/board/insert")
	public ResponseEntity<String> boardInsert(@RequestBody Board board){
		String result="";
		try {
			bDao.save(board);
			result="YES";
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);
		}
		return new ResponseEntity<>(result,HttpStatus.CREATED);
	}
	
	@PutMapping("/board/update/{no}")
	public ResponseEntity<String> boardUpdate(@PathVariable("no") int no,@RequestBody Board board){
		String result = "";
		try {
			Board _dbData = bDao.findByNo(no);
			if(_dbData.getPwd().equals(board.getPwd())) {
				board.setHit(_dbData.getHit());
				bDao.save(board);
				//비밀번호가 맞았을 시
				result="YES";
			}
			else {
				//비밀번호가 틀렸을 시
				result="NO";
			}
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@DeleteMapping("/board/delete/{no}")
	public ResponseEntity<String> boardDelete(@PathVariable("no") int no,@RequestBody Board board){
		String result = "";
		try {
			Board _dbData = bDao.findByNo(no);
			if(_dbData.getPwd().equals(board.getPwd())) {
				bDao.delete(_dbData);
				//비밀번호가 맞았을 시
				result="YES";
			}
			else {
				//비밀버호가 틀렸을 시
				result="NO";
			}
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
}
