package org.restWebService.RPlayer.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.restWebService.RPlayer.converter.EpisodeConverter;
import org.restWebService.RPlayer.domain.Episode;
import org.restWebService.RPlayer.domain.Season;
import org.restWebService.RPlayer.dto.EpisodeDto;
import org.restWebService.RPlayer.repository.EpisodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EpisodeService {
	
	@Autowired
	private EpisodeRepository episodeRepository;
	
	@Autowired
	private SeasonService seasonService;
	
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
	
	public List<Episode> findEntitiesByIdSeason(Long idSeason){
		return episodeRepository.findByIdSeason(idSeason);
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
	
	/**
	 * Guarda o actualiza un Epsisode
	 * @param episodeDto
	 * @return
	 */
	public EpisodeDto save(EpisodeDto episodeDto) {
		EpisodeDto res = new EpisodeDto();
		List<String> errores = verificaEpisodeDto(episodeDto);
		if(errores.isEmpty()){
			Episode entity = episodeConverter.convertDtoToEntity(episodeDto);
			Season season = seasonService.findOneEntity(episodeDto.getIdSeason());
			entity.setSeason(season);
			Episode episodeSaved = episodeRepository.save(entity);
			res = episodeConverter.convertEntityToDto(episodeSaved);
		}else{
			if(episodeDto!=null){
				res = episodeDto;
			}
			res.setErrores(errores);
		}
		return res;
	}
	
	/**
	 * Verifica que los datos de un Episode estén correctamente rellenos
	 * @param episodeDto
	 * @return
	 */
	private List<String> verificaEpisodeDto(EpisodeDto episodeDto){
		List<String> errores = new ArrayList<>();
		if(episodeDto==null){
			errores.add("El episodio no puede tener un valor nulo");
		}else{
			if(episodeDto.getIdSeason()==null){
				errores.add("Se debe indicar la temporada a la que pertenece");
			}
			if(episodeDto.getEpisodePath()==null || episodeDto.getEpisodePath().trim().equals("")){
				errores.add("Se debe indicar la ruta del almacenamiento interna del episodio");
			}
			if(episodeDto.getNumber()==null){
				errores.add("Se debe indicar un número de episodio");
			}
		}
		return errores;
	}
	
	/**
	 * Elimina un listado de entidades de tipo Episode
	 * @param listEpisode
	 */
	public void deleteAllEntities(List<Episode> listEpisode){
		episodeRepository.delete(listEpisode);
	}
	
	/**
	 * Elimina un episodio por su id
	 * @param idEpisode
	 * @return
	 */
	public EpisodeDto delete(Long idEpisode) {
		EpisodeDto res = new EpisodeDto();
		if(idEpisode!=null){
			episodeRepository.delete(idEpisode);
		}
		return res;
	}

}
