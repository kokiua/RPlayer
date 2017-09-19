package org.restWebService.RPlayer.controller;

import java.util.List;

import org.restWebService.RPlayer.dto.SeasonDto;
import org.restWebService.RPlayer.service.SeasonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("season")
public class SeasonController {
	
	@Autowired
	private SeasonService seasonService;
	
	@RequestMapping(value = "/findByIdSerieOrderByNumberASC/{idSerie}", method = RequestMethod.GET)
	public List<SeasonDto> findByIdSerieOrderByNumberASC(@PathVariable("idSerie") Long idSerie){
		return seasonService.findByIdSerieOrderByNumberASC(idSerie);
	}
	
	@RequestMapping(value = "/delete/{idSeason}", method = RequestMethod.GET)
	public SeasonDto delete(@PathVariable("idSeason") Long idSeason){
		return seasonService.delete(idSeason);
	}

}
