package org.restWebService.RPlayer.controller;

import java.util.List;

import org.restWebService.RPlayer.dto.EpisodeDto;
import org.restWebService.RPlayer.service.EpisodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("episode")
public class EpisodeController {
	
	@Autowired
	private EpisodeService episodeService;
	
	@RequestMapping(value = "/findByIdSeasonOrderByNumberAsc/{idSeason}", method = RequestMethod.GET)
	public List<EpisodeDto> findByIdSeasonOrderByNumberAsc(@PathVariable("idSeason") Long idSeason){
		return episodeService.findByIdSeasonOrderByNumberAsc(idSeason);
	}
	
}
