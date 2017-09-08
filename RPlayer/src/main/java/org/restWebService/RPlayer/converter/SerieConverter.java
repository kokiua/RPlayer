package org.restWebService.RPlayer.converter;

import java.util.ArrayList;
import java.util.List;

import org.restWebService.RPlayer.domain.Serie;
import org.restWebService.RPlayer.dto.SerieDto;
import org.springframework.stereotype.Component;

@Component
public class SerieConverter {
	
	/**
	 * Convierte una SerieDto en una Serie
	 * @param dto
	 * @return
	 */
	public Serie convertDtoToEntity(SerieDto dto){
		Serie entity = new Serie();
		if(dto!=null){
			entity.setId(dto.getId());
			entity.setVersion(dto.getVersion());
			entity.setName(dto.getName());
			entity.setReleaseDate(dto.getReleaseDate());
			entity.setDescription(dto.getDescription());
			entity.setImage(dto.getImage());
		}
		return entity;
	}
	
	/**
	 * Convierte una Serie en una SerieDto
	 * @param entity
	 * @return
	 */
	public SerieDto convertEntityToDto(Serie entity){
		SerieDto dto = new SerieDto();
		if(entity!=null){
			dto.setId(entity.getId());
			dto.setVersion(entity.getVersion());
			dto.setName(entity.getName());
			dto.setReleaseDate(entity.getReleaseDate());
			dto.setDescription(entity.getDescription());
			dto.setImage(entity.getImage());
		}
		return dto;
	}
	
	/**
	 * Convierte una lista de Serie en una de SerieDto
	 * @param entities
	 * @return
	 */
	public List<SerieDto> convertListEntityToListDto(List<Serie> entities){
		List<SerieDto> dtos = new ArrayList<>();
		if(entities!=null){
			for(Serie entity: entities){
				SerieDto dto = convertEntityToDto(entity);
				dtos.add(dto);
			}
		}
		return dtos;
	}

}
