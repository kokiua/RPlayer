package org.restWebService.RPlayer.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.restWebService.RPlayer.domain.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Transactional
public interface SeasonRepository extends JpaRepository<Season, Long> {
	
	@Query("SELECT s FROM Season s WHERE s.serie.id = ?1 ORDER BY s.number ASC")
	public List<Season> findByIdSerieOrderByNumberASC(Long idSerie);

}
