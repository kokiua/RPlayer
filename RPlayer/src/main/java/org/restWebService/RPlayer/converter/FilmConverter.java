package org.restWebService.RPlayer.converter;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.restWebService.RPlayer.domain.Film;
import org.restWebService.RPlayer.dto.FilmDto;
import org.restWebService.RPlayer.dto.FilmTypeDto;
import org.springframework.stereotype.Component;

@Component
public class FilmConverter {
	
	@Resource
	private FilmTypeConverter filmTypeConverter;
	
	/**
	 * Convierte un FilmDto en Film
	 * @param dto
	 * @param filmTypeDto
	 * @return
	 */
	public Film convertDtoToEntity(FilmDto dto, FilmTypeDto filmTypeDto){
		Film entity = new Film();
		if(dto!=null){
			entity.setId(dto.getId());
			entity.setVersion(dto.getVersion());
			entity.setName(dto.getName());
			entity.setDescription(dto.getDescription());
			entity.setRealeaseDate(dto.getRealeaseDate());
			entity.setRate(dto.getRate());
			entity.setTrailerUrl(dto.getTrailerUrl());
			entity.setImage(dto.getImage());
			entity.setPath(dto.getPath());
			if(filmTypeDto!=null){
				entity.setFilmType(filmTypeConverter.convertDtoToEntity(filmTypeDto));	
			}
		}
		return entity;
	}
	
	/**
	 * Convierte un Film en un FilmDto
	 * @param entity
	 * @return
	 */
	public FilmDto convertEntityToDto(Film entity){
		FilmDto dto = new FilmDto();
		if(entity!=null){
			dto.setId(entity.getId());
			dto.setVersion(entity.getVersion());
			dto.setName(entity.getName());
			dto.setDescription(entity.getDescription());
			dto.setRealeaseDate(entity.getRealeaseDate());
			dto.setRate(entity.getRate());
			dto.setTrailerUrl(entity.getTrailerUrl());
			dto.setImage(entity.getImage());
			dto.setPath(entity.getPath());
			if(entity.getFilmType()!=null){
				dto.setFilmTypeDto(filmTypeConverter.convertEntityToDto(entity.getFilmType()));	
			}
		}
		return dto;
	}
	
	/**
	 * Convierte una lista de Film en una lista de FilmDto
	 * @param entities
	 * @return
	 */
	public List<FilmDto> convertListEntityToListDto(List<Film> entities){
		List<FilmDto> dtos = new ArrayList<>();
		if(entities!=null){
			for(Film entity: entities){
				FilmDto dto = convertEntityToDto(entity);
				dtos.add(dto);
			}
		}
		return dtos;
	}

}
