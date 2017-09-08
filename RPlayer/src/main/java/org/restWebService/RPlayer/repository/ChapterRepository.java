package org.restWebService.RPlayer.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.restWebService.RPlayer.domain.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Transactional
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
	
	@Query("SELECT c FROM Chapter c WHERE c.season.id = ?1 ORDER BY c.number ASC")
	public List<Chapter> findByIdSeasonOrderByNumberAsc();

}
