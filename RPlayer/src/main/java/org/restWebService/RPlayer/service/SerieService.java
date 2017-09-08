package org.restWebService.RPlayer.service;

import java.util.List;

import javax.annotation.Resource;

import org.restWebService.RPlayer.converter.SerieConverter;
import org.restWebService.RPlayer.domain.Serie;
import org.restWebService.RPlayer.dto.SerieDto;
import org.restWebService.RPlayer.repository.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SerieService {
	
	@Autowired
	private SerieRepository serieRepository;
	
	@Resource
	private SerieConverter serieConverter;
	
	/**
	 * Devuelve las series ordenadas por su name asc
	 * @return
	 */
	public List<SerieDto> findAllOrderByNameAsc(){
		List<Serie> entities = serieRepository.findAllOrderByNameAsc();
		List<SerieDto> res = serieConverter.convertListEntityToListDto(entities);
		return res;
	}

}
