package org.restWebService.RPlayer.converter;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.restWebService.RPlayer.domain.Season;
import org.restWebService.RPlayer.dto.SeasonDto;
import org.springframework.stereotype.Component;

@Component
public class SeasonConverter {
	
	@Resource
	private EpisodeConverter episodeConverter;
	
	/**
	 * Convierte un SeasonDto en Season
	 * @param dto
	 * @return
	 */
	public Season convertDtoToEntity(SeasonDto dto){
		Season entity = new Season();
		if(dto!=null){
			entity.setId(dto.getId());
			entity.setVersion(dto.getId());
			entity.setNumber(dto.getNumber());
			entity.setName(dto.getName());
			entity.setRealeaseDate(dto.getRealeaseDate());
			entity.setFinishDate(dto.getFinishDate());
		}
		return entity;
	}
	
	/**
	 * Convierte un Season en SeasonDto
	 * @param entity
	 * @return
	 */
	public SeasonDto convertEntityToDto(Season entity){
		SeasonDto dto = new SeasonDto();
		if(entity!=null){
			dto.setId(entity.getId());
			dto.setVersion(entity.getVersion());
			if(entity.getSerie()!=null){
				dto.setIdSerie(entity.getSerie().getId());
			}
			dto.setNumber(entity.getNumber());
			dto.setName(entity.getName());
			dto.setRealeaseDate(entity.getRealeaseDate());
			dto.setFinishDate(entity.getFinishDate());
		}
		return dto;
	}
	
	/**
	 * Convierte una lista de Season en una de SeasonDto
	 * @param entities
	 * @return
	 */
	public List<SeasonDto> convertListEntityToListDto(List<Season> entities){
		List<SeasonDto> dtos = new ArrayList<>();
		if(entities!=null){
			for(Season entity: entities){
				SeasonDto dto = convertEntityToDto(entity);
				dtos.add(dto);
			}
		}
		return dtos;
	}

}
