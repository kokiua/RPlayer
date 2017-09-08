package org.restWebService.RPlayer.converter;

import java.util.ArrayList;
import java.util.List;

import org.restWebService.RPlayer.domain.FilmType;
import org.restWebService.RPlayer.dto.FilmTypeDto;
import org.springframework.stereotype.Component;

@Component
public class FilmTypeConverter {
	
	/**
	 * Convierte un FilmTypeDto en FilmType
	 * @param dto
	 * @return
	 */
	public FilmType convertDtoToEntity(FilmTypeDto dto){
		FilmType entity = new FilmType();
		if(dto!=null){
			entity.setId(dto.getId());
			entity.setVersion(dto.getVersion());
			entity.setDescription(dto.getDescription());
		}
		return entity;
	}
	
	/**
	 * Convierte un FilmType en un FilmTypeDto
	 * @param entity
	 * @return
	 */
	public FilmTypeDto convertEntityToDto(FilmType entity){
		FilmTypeDto dto = new FilmTypeDto();
		if(entity!=null){
			dto.setId(entity.getId());
			dto.setVersion(entity.getVersion());
			dto.setDescription(entity.getDescription());
		}
		return dto;
	}
	
	/** 
	 * Convierte una lista de FilmTypeDto en una de FilmType
	 * @param dtos
	 * @return
	 */
	public List<FilmType> convertListDtoToLisEntity(List<FilmTypeDto> dtos){
		List<FilmType> entities = new ArrayList<>();
		if(dtos!=null){
			for(FilmTypeDto dto: dtos){
				FilmType entity = convertDtoToEntity(dto);
				entities.add(entity);
			}
		}
		return entities;
	}
	
	/**
	 * Convierte una lista de FilmType en una lista de FilmTypeDto
	 * @param entities
	 * @return
	 */
	public List<FilmTypeDto> convertListEntityToListDto(List<FilmType> entities){
		List<FilmTypeDto> dtos = new ArrayList<>();
		if(entities!=null){
			for(FilmType entity: entities){
				FilmTypeDto dto = convertEntityToDto(entity);
				dtos.add(dto);
			}
		}
		return dtos;
	}

}
