package org.restWebService.RPlayer.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.restWebService.RPlayer.converter.SerieConverter;
import org.restWebService.RPlayer.domain.Season;
import org.restWebService.RPlayer.domain.Serie;
import org.restWebService.RPlayer.dto.SerieDto;
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
	
	// TODO quitar para produccion
	@Autowired
	private SeasonRepository seasonRepository;
	
	@Resource
	private SerieConverter serieConverter;
	
	@PostConstruct
	public void cargaEntidadesPrueba(){
		String cargaEntidades = Util.getProperties("application.properties").getProperty("carga.entidades.prueba");
		if(cargaEntidades!=null && cargaEntidades.equals(Constantes.S_TRUE)){
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
				seasonRepository.save(listSeason);
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

}
