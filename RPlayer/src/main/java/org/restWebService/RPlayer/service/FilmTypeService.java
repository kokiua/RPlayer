package org.restWebService.RPlayer.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.restWebService.RPlayer.converter.FilmTypeConverter;
import org.restWebService.RPlayer.domain.FilmType;
import org.restWebService.RPlayer.dto.FilmTypeDto;
import org.restWebService.RPlayer.repository.FilmTypeRepository;
import org.restWebService.RPlayer.util.Constantes;
import org.restWebService.RPlayer.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilmTypeService {
	
	@Autowired
	private FilmTypeRepository filmTypeRepository;
	
	@Resource
	private FilmTypeConverter filmTypeConverter;
	
	@PostConstruct
	public void inicialice(){
		String autoUpdate = Util.getProperties("application.properties").getProperty("spring.jpa.hibernate.ddl-auto");
		if(autoUpdate!=null && autoUpdate.equals(Constantes.S_UPDATE)){
			filmTypeRepository.deleteAll();
			List<FilmType> listFilmType = new ArrayList<>();
			listFilmType.add( new FilmType("Romantica"));
			listFilmType.add( new FilmType("Droma"));
			listFilmType.add( new FilmType("Acción"));
			listFilmType.add( new FilmType("Aventura"));
			listFilmType.add( new FilmType("Ciencia Ficción"));
			filmTypeRepository.save(listFilmType);
			System.out.println("Se han creado los distintos tipos de películas");
		}
	}
	
	/**
	 * Devuelve un FilmType por su id, este metodo solo se debe utilizar para lanzar las pruebas
	 * @param id
	 * @return
	 */
	public FilmType findOneEntity(Long id){
		return filmTypeRepository.findOne(id);
	}
	
	/**
	 * Devuelve un FilmType por su id, este metodo solo se debe utilizar para lanzar las pruebas
	 * @param id
	 * @return
	 */
	public FilmTypeDto findOne(Long id){
		FilmType entity = filmTypeRepository.findOne(id);
		FilmTypeDto res = filmTypeConverter.convertEntityToDto(entity);
		return res;
	}
	
	/**
	 * Devuelve el listado de tipos de peliculas ordenados por descripcion asc
	 * @return
	 */
	public List<FilmTypeDto> findAllOrderByDescriptionAsc(){
		List<FilmType> entities = filmTypeRepository.findAllOrderByDescriptionAsc();
		List<FilmTypeDto> res = filmTypeConverter.convertListEntityToListDto(entities);
		return res;
	}

}
