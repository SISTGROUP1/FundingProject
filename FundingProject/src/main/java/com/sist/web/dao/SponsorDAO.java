package com.sist.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
import com.sist.web.entity.Sponsor;

public interface SponsorDAO extends JpaRepository<Sponsor, Integer>{
	public List<Sponsor> findByFno(int fno);
}
