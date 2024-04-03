package com.sist.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;
import com.sist.web.entity.Board;

public interface BoardDAO extends JpaRepository<Board, Integer>{
	@Query(value = "SELECT * FROM jpaboard "
			+ "ORDER BY no DESC "
			+ "LIMIT :page,20",nativeQuery = true)
	public List<Board> boardList(@Param("page") int page);
	
	public Board findByNo(int no);
}
