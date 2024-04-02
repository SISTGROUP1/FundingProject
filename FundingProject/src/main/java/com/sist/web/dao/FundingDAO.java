package com.sist.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;
import com.sist.web.entity.Funding;

public interface FundingDAO extends JpaRepository<Funding, Integer>{
	@Query(value = "SELECT * FROM funding "
			+ "ORDER BY fno "
			+ "LIMIT :start,20",nativeQuery = true)
	public List<Funding> fundingMainData(@Param("start") int start);
	
	@Query(value = "SELECT * FROM funding "
			+ "WHERE fno = :fno",nativeQuery = true)
	public Funding fundingDetailData(@Param("fno") int fno);
	
	@Query(value = "SELECT * FROM funding "
			+ "WHERE title LIKE CONCAT('%',:title,'%') "
			+ "ORDER BY fno "
			+ "LIMIT :page,20",nativeQuery = true)
	public List<Funding> fundingFindData(@Param("title") String title,@Param("page") int page);
	
	@Query(value = "SELECT COUNT(*) FROM funding "
			+ "WHERE title LIKE CONCAT('%',:title,'%')",nativeQuery = true)
	public int fundingFindCount(@Param("title") String title);
}
