package org.restWebService.RPlayer.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.restWebService.RPlayer.converter.SeasonConverter;
import org.restWebService.RPlayer.domain.Episode;
import org.restWebService.RPlayer.domain.Season;
import org.restWebService.RPlayer.dto.SeasonDto;
import org.restWebService.RPlayer.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeasonService {
	
	@Autowired
	private SeasonRepository seasonRepository;
	
	@Autowired
	private EpisodeService episodeService;
	
	@Resource
	private SeasonConverter seasonConverter;

	/**
	 * Devuelve las temporadas de una temporada ordenadas por su numero asc
	 * @return
	 */
	public List<SeasonDto> findByIdSerieOrderByNumberASC(Long idSerie){
		List<SeasonDto> res = new ArrayList<>();
		if(idSerie!=null){
			List<Season> entities = seasonRepository.findByIdSerieOrderByNumberASC(idSerie);
			res = seasonConverter.convertListEntityToListDto(entities);
		}
		return res;
	}
	
	/**
	 * Devuelve las season de una determinada serie 
	 * @return
	 */
	public List<Season> findEntitiesByIdSerie(Long idSerie){
		return seasonRepository.findByIdSerie(idSerie);
	}
	
	/**
	 * Elimina un listado de entidades del tipo Season
	 * @param listSeason
	 */
	public void deleteAllEntities(List<Season> listSeason){
		seasonRepository.delete(listSeason);
	}
	
	/**
	 * Elimina una Season dada su id
	 * @param idSeason
	 * @return
	 */
	public SeasonDto delete(Long idSeason) {
		SeasonDto res = new SeasonDto();
		if(idSeason!=null){
			// Primero eliminamos todos los episodios de la temporada
			List<Episode> listEpisode = episodeService.findEntitiesByIdSeason(idSeason);
			episodeService.deleteAllEntities(listEpisode);
			seasonRepository.delete(idSeason);
		}
		return res;
	}
	
}
