package org.restWebService.RPlayer.converter;

import java.util.ArrayList;
import java.util.List;

import org.restWebService.RPlayer.domain.Episode;
import org.restWebService.RPlayer.dto.EpisodeDto;
import org.springframework.stereotype.Component;

@Component
public class EpisodeConverter {
	
	/**
	 * Convierte un EpisodeDto en Episode
	 * @param dto
	 * @return
	 */
	public Episode convertDtoToEntity(EpisodeDto dto){
		Episode entity = new Episode();
		if(dto!=null){
			entity.setId(dto.getId());
			entity.setVersion(dto.getVersion());
			entity.setName(dto.getName());
			entity.setNumber(dto.getNumber());
			entity.setPath(dto.getPath());
		}
		return entity;
	}
	
	/**
	 * Convierte un Episode en EpisodeDto
	 * @param entity
	 * @return
	 */
	public EpisodeDto convertEntityToDto(Episode entity){
		EpisodeDto dto = new EpisodeDto();
		if(entity!=null){
			dto.setId(entity.getId());
			dto.setVersion(entity.getVersion());
			if(entity.getSeason()!=null){
				dto.setIdSeason(entity.getSeason().getId());
			}
			dto.setName(entity.getName());
			dto.setNumber(entity.getNumber());
			dto.setPath(entity.getPath());
		}
		return dto;
	}
	
	/**
	 * Convierte una lista de Episode en una de EpisodeDto
	 * @param entities
	 * @return
	 */
	public List<EpisodeDto> convertListEntityToListDto(List<Episode> entities){
		List<EpisodeDto> dtos = new ArrayList<>();
		if(entities!=null){
			for(Episode entity: entities){
				EpisodeDto dto = convertEntityToDto(entity);
				dtos.add(dto);
			}
		}
		return dtos;
	}

}
