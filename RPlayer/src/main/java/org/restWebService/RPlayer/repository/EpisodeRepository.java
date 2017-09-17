package org.restWebService.RPlayer.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.restWebService.RPlayer.domain.Episode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Transactional
public interface EpisodeRepository extends JpaRepository<Episode, Long> {
	
	@Query("SELECT e FROM Episode e WHERE e.season.id = ?1 ORDER BY e.number ASC")
	public List<Episode> findByIdSeasonOrderByNumberAsc(Long idSeason);

}
