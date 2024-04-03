package com.sist.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.*;
import com.sist.web.entity.Sponsor;

public interface SponsorDAO extends JpaRepository<Sponsor, Integer>{
	@Query(value = "SELECT * "
			+ "FROM sponsor "
			+ "WHERE fno=:fno "
			+ "ORDER BY regdate DESC "
			+ "LIMIT :start,5",nativeQuery = true)
	public List<Sponsor> sponsorListData(@Param("fno") int fno,@Param("start") int start);
	@Query(value = "SELECT COUNT(*) "
			+ "FROM sponsor "
			+ "WHERE fno=:fno",nativeQuery = true)
	public int sponsorTotalCount(@Param("fno") int fno);
	public List<Sponsor> findByFno(int fno);
	
	@Query(value = "SELECT sum(pay) FROM sponsor "
			+ "WHERE fno=:fno",nativeQuery = true)
	public int sponsorSumPay(@Param("fno") int fno);
}
