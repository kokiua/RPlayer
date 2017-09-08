package org.restWebService.RPlayer.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.restWebService.RPlayer.domain.FilmType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Transactional
public interface FilmTypeRepository extends JpaRepository<FilmType, Long> {
	
	@Query("SELECT ft FROM FilmType ft ORDER BY ft.description ASC")
	public List<FilmType> findAllOrderByDescriptionAsc();

}
