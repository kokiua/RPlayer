package org.restWebService.RPlayer.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.restWebService.RPlayer.converter.EpisodeConverter;
import org.restWebService.RPlayer.domain.Episode;
import org.restWebService.RPlayer.dto.EpisodeDto;
import org.restWebService.RPlayer.repository.EpisodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EpisodeService {
	
	@Autowired
	private EpisodeRepository episodeRepository;
	
	@Resource
	private EpisodeConverter episodeConverter;
	
	/**
	 * Devuelve los episodios de una temporada ordenados por su numero asc
	 * @return
	 */
	public List<EpisodeDto> findByIdSeasonOrderByNumberAsc(Long idSeason){
		List<EpisodeDto> res = new ArrayList<>();
		if(idSeason!=null){
			List<Episode> entities = episodeRepository.findByIdSeasonOrderByNumberAsc(idSeason);
			res = episodeConverter.convertListEntityToListDto(entities);
		}
		return res;
	}

	/**
	 * Devuelve una EpisodeDto dado su id
	 * @param idEpisode
	 * @return
	 */
	public EpisodeDto findOne(Long idEpisode) {
		Episode entity = episodeRepository.findOne(idEpisode);
		EpisodeDto res = episodeConverter.convertEntityToDto(entity);
		return res;
	}

}
