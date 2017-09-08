package org.restWebService.RPlayer.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.restWebService.RPlayer.domain.Serie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Transactional
public interface SerieRepository extends JpaRepository<Serie, Long> {
	
	@Query("SELECT s FROM Serie s ORDER BY s.name ASC")
	public List<Serie> findAllOrderByNameAsc();

}
