package org.restWebService.RPlayer.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.restWebService.RPlayer.converter.SeasonConverter;
import org.restWebService.RPlayer.domain.Season;
import org.restWebService.RPlayer.dto.SeasonDto;
import org.restWebService.RPlayer.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeasonService {
	
	@Autowired
	private SeasonRepository seasonRepository;
	
	@Resource
	private SeasonConverter seasonConverter;

	/**
	 * Devuelve las temporadas de una temporada ordenadas por su numero asc
	 * @return
	 */
	public List<SeasonDto> findByIdSerieOrderByNumberASC(Long idSerie){
		List<SeasonDto> res = new ArrayList<>();
		if(idSerie!=null){
			List<Season> entities = seasonRepository.findByIdSerieOrderByNumberASC(idSerie);
			res = seasonConverter.convertListEntityToListDto(entities);
		}
		return res;
	}
	
}
