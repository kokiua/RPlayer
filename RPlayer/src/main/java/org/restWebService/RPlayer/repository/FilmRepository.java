package org.restWebService.RPlayer.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.restWebService.RPlayer.domain.Film;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Transactional
public interface FilmRepository extends JpaRepository<Film, Long> {
	
	@Query("SELECT f FROM Film f ORDER BY f.name ASC")
	public List<Film> findAllOrderByNameAsc();
	
	@Query("SELECT f FROM Film f WHERE f.filmType.id = ?1 ORDER BY f.name ASC")
	public List<Film> findByIdFilmTypeOrderByNameAsc(Long idFilmType);

}
