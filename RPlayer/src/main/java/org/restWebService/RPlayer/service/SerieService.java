package org.restWebService.RPlayer.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.restWebService.RPlayer.converter.SerieConverter;
import org.restWebService.RPlayer.domain.Episode;
import org.restWebService.RPlayer.domain.Season;
import org.restWebService.RPlayer.domain.Serie;
import org.restWebService.RPlayer.dto.SerieDto;
import org.restWebService.RPlayer.repository.EpisodeRepository;
import org.restWebService.RPlayer.repository.SeasonRepository;
import org.restWebService.RPlayer.repository.SerieRepository;
import org.restWebService.RPlayer.util.Constantes;
import org.restWebService.RPlayer.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SerieService {
	
	@Autowired
	private SerieRepository serieRepository;
	
	@Autowired
	private SeasonService seasonService;
	
	@Autowired
	private EpisodeService episodeService;
	
	// TODO quitar para produccion
	@Autowired
	private SeasonRepository seasonRepository;
	
	// TODO quitar para produccion
	@Autowired
	private EpisodeRepository episodeRepository;
	
	@Resource
	private SerieConverter serieConverter;
	
	@PostConstruct
	public void cargaEntidadesPrueba(){
		String cargaEntidades = Util.getProperties("application.properties").getProperty("carga.entidades.prueba");
		if(cargaEntidades!=null && cargaEntidades.equals(Constantes.S_TRUE)){
			episodeRepository.deleteAll();
			seasonRepository.deleteAll();
			serieRepository.deleteAll();
			List<Serie> listSerie = new ArrayList<>();
			listSerie.add(new Serie("Serie 1", 2010, "Serie 1", null));
			listSerie.add(new Serie("Serie 2", 2009, "Serie 2", null));
			listSerie.add(new Serie("Serie 3", 2008, "Serie 3", null));
			listSerie.add(new Serie("Serie 4", 2007, "Serie 4", null));
			List<Serie> listSerieSaved = serieRepository.save(listSerie);
			// Crearemos dos temporadas a cada serie
			for(Serie serie: listSerieSaved) {
				List<Season> listSeason = new ArrayList<>();
				listSeason.add(new Season(1, serie));
				listSeason.add(new Season(2, serie));
				List<Season> listSeasonSaved = seasonRepository.save(listSeason);
				// Por cada temporada voy a añadir 2 capitolos
				for(Season season: listSeasonSaved) {
					List<Episode> listEpisode = new ArrayList<>();
					listEpisode.add(new Episode("Episodio 1", 1, "C:/1", season));
					listEpisode.add(new Episode("Episodio 2", 2, "C:/1", season));
					episodeRepository.save(listEpisode);
				}
			}
			System.out.println("Se han cargado peliculas de prueba");
		}
	}
	
	/**
	 * Devuelve las series ordenadas por su name asc
	 * @return
	 */
	public List<SerieDto> findAllOrderByNameAsc(){
		List<Serie> entities = serieRepository.findAllOrderByNameAsc();
		List<SerieDto> res = serieConverter.convertListEntityToListDto(entities);
		return res;
	}
	
	/**
	 * Devuelve una SerieDto dada su id
	 * @param idSerie
	 * @return
	 */
	public SerieDto findOne(Long idSerie) {
		Serie entity = serieRepository.findOne(idSerie);
		SerieDto res = serieConverter.convertEntityToDto(entity);
		return res;
	}
	
	/**
	 * Devuelve una Serie por su id
	 * @param idSerie
	 * @return
	 */
	public Serie findOneEntity(Long idSerie){
		return serieRepository.findOne(idSerie);
	}
	
	/**
	 * Guarda o actualiza una película
	 * @param serieDto
	 * @return
	 */
	public SerieDto save(SerieDto serieDto) {
		SerieDto res = new SerieDto();
		List<String> errores = verificaSerieDto(serieDto);
		if(errores.isEmpty()){
			// Recuperamos la imagen que tuviera ya que en el filmDto para guardar no vendrá
			if(serieDto.getId()!=null) {
				Serie aux = serieRepository.findOne(serieDto.getId());
				if(aux != null && aux.getImage()!=null) {
					serieDto.setImage(aux.getImage());
				}
			}
			Serie entity = serieConverter.convertDtoToEntity(serieDto);
			Serie serieSaved = serieRepository.save(entity);
			res = serieConverter.convertEntityToDto(serieSaved);
		}else{
			if(serieDto!=null){
				res = serieDto;
			}
			res.setErrores(errores);
		}
		return res;
	}
	
	/**
	 * Verifica que los datos de una serie estén correctamente rellenos
	 * @param serieDto
	 * @return
	 */
	private List<String> verificaSerieDto(SerieDto serieDto){
		List<String> errores = new ArrayList<>();
		if(serieDto==null){
			errores.add("La serie no puede tener un valor nulo");
		}else{
			if(serieDto.getName()==null || serieDto.getName().trim().equals("")){
				errores.add("Se debe indicar el título de la serie");
			}
			if(serieDto.getDescription()==null || serieDto.getDescription().trim().equals("")){
				errores.add("Se debe indicar la descripción de la serie");
			}
		}
		return errores;
	}

	/**
	 * Actualiza la imagen de una serie
	 * @param idSerie
	 * @param image
	 * @return
	 */
	public SerieDto uploadFilmImage(Long idSerie, byte[] image) {
		SerieDto res = new SerieDto();
		if(idSerie!=null) {
			Serie entity = serieRepository.findOne(idSerie);
			if(entity!=null) {
				entity.setImage(image);
				Serie entitySaved = serieRepository.save(entity);
				res = serieConverter.convertEntityToDto(entitySaved);
			}
		}
		return res;
	}
	
	/**
	 * Elimina una serie dado su id
	 * @param idSerie
	 * @return
	 */
	public SerieDto delete(Long idSerie) {
		SerieDto dto = new SerieDto();
		if(idSerie!=null) {
			// Eliminaremos la temporada y los episodios asociados a la serie
			// Primero recuperamos las temporadas
			List<Season> listSeason = seasonService.findEntitiesByIdSerie(idSerie);
			// Por cada una de las temporadas recuperamos sus capitulos y los eliminamos
			for(Season season: listSeason){
				List<Episode> listEpisode = episodeService.findEntitiesByIdSeason(season.getId());
				episodeService.deleteAllEntities(listEpisode);
			}
			// Eliminamos las temporadas
			seasonService.deleteAllEntities(listSeason);
			// Finalmente elminamos la serie
			serieRepository.delete(idSerie);
		}
		return dto;
	}

}
