package org.restWebService.RPlayer.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.restWebService.RPlayer.converter.FilmConverter;
import org.restWebService.RPlayer.domain.Film;
import org.restWebService.RPlayer.dto.FilmDto;
import org.restWebService.RPlayer.dto.FilmTypeDto;
import org.restWebService.RPlayer.repository.FilmRepository;
import org.restWebService.RPlayer.util.Constantes;
import org.restWebService.RPlayer.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilmService {
	
	@Autowired
	private FilmRepository filmRepository;
	
	@Autowired
	private FilmTypeService filmTypeService;
	
	@Resource
	private FilmConverter filmConverter;
	
	@PostConstruct
	public void cargaEntidadesPrueba(){
		String cargaEntidades = Util.getProperties("application.properties").getProperty("carga.entidades.prueba");
		if(cargaEntidades!=null && cargaEntidades.equals(Constantes.S_TRUE)){
			filmRepository.deleteAll();
			List<Film> listFilms = new ArrayList<>();
			listFilms.add(new Film("Film 1", "Description Film 1", 2010, 1, "https://www.youtube.com/watch?v=KT3LmKT7BR4", null, "C:/", filmTypeService.findOneEntity(1l)));
			listFilms.add(new Film("Film 2", "Description Film 2", 2011, 2, "https://www.youtube.com/watch?v=KT3LmKT7BR4", null, "C:/", filmTypeService.findOneEntity(2l)));
			listFilms.add(new Film("Film 3", "Description Film 3", 2012, 3, "https://www.youtube.com/watch?v=KT3LmKT7BR4", null, "C:/", filmTypeService.findOneEntity(3l)));
			listFilms.add(new Film("Film 4", "Description Film 4", 2013, 4, "https://www.youtube.com/watch?v=KT3LmKT7BR4", null, "C:/", filmTypeService.findOneEntity(4l)));
			listFilms.add(new Film("Film 5", "Description Film 5", 2014, 5, "https://www.youtube.com/watch?v=KT3LmKT7BR4", null, "C:/", filmTypeService.findOneEntity(5l)));
			filmRepository.save(listFilms);
			System.out.println("Se han cargado peliculas de prueba");
		}
	}
	
	/**
	 * Devuelve todas las peliculas ordenadas por su nombre Asc
	 * @return
	 */
	public List<FilmDto> findAllOrderByNameAsc(){
		List<Film> entities = filmRepository.findAllOrderByNameAsc();
		List<FilmDto> res = filmConverter.convertListEntityToListDto(entities);
		return res;
	}
	
	/**
	 * Devuelve una FilmDto dado su id
	 * @param idFilm
	 * @return
	 */
	public FilmDto findOne(Long idFilm){
		Film entity = filmRepository.findOne(idFilm);
		FilmDto res = filmConverter.convertEntityToDto(entity);
		return res;
	}

	/**
	 * Almacena un Film en la base de datos
	 * @param filmDto
	 * @return
	 */
	public FilmDto save(FilmDto filmDto) {
		FilmDto res = new FilmDto();
		List<String> errores = verificaFilmDto(filmDto);
		if(errores.isEmpty()){
			FilmTypeDto filmTypeDto = filmTypeService.findOne(filmDto.getFilmTypeDto().getId());
			Film entity = filmConverter.convertDtoToEntity(filmDto,filmTypeDto);
			Film filmSaved = filmRepository.save(entity);
			res = filmConverter.convertEntityToDto(filmSaved);
		}else{
			if(filmDto!=null){
				res = filmDto;
			}
			res.setErrores(errores);
		}
		return res;
	}
	
	/**
	 * Verifica que los datos de una film están correctamente rellenados
	 * @param filmDto
	 * @return
	 */
	private List<String> verificaFilmDto(FilmDto filmDto){
		List<String> errores = new ArrayList<>();
		if(filmDto==null){
			errores.add("La película no puede tener un valor nulo");
		}else{
			if(filmDto.getName()==null || filmDto.getName().trim().equals("")){
				errores.add("Se debe indicar el título de película");
			}
			if(filmDto.getDescription()==null || filmDto.getDescription().trim().equals("")){
				errores.add("Se debe indicar la descripción de película");
			}
			if(filmDto.getFilmPath()==null || filmDto.getFilmPath().trim().equals("")){
				errores.add("Se debe indicar la ruta del almacenamiento interna");
			}
			if(filmDto.getFilmTypeDto()==null || filmDto.getFilmTypeDto().getId()==null){
				errores.add("Se debe indicar el tipo de película");
			}
		}
		return errores;
	}
	
	/**
	 * Actualiza la imagen de una película
	 * @param idFilm
	 * @param image
	 * @return
	 */
	public FilmDto uploadFilmImage(Long idFilm, byte[] image) {
		FilmDto res = new FilmDto();
		if(idFilm!=null) {
			Film entity = filmRepository.findOne(idFilm);
			if(entity!=null) {
				entity.setImage(image);
				Film entitySaved = filmRepository.save(entity);
				res = filmConverter.convertEntityToDto(entitySaved);
			}
		}
		return res;
	}

}
