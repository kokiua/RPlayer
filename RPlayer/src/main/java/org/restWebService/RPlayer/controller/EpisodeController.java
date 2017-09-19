package org.restWebService.RPlayer.controller;

import java.io.IOException;
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
	
	@RequestMapping(value = "/delete/{idEpisode}", method = RequestMethod.GET)
	public EpisodeDto delete(@PathVariable("idEpisode") Long idEpisode){
		return episodeService.delete(idEpisode);
	}
	
	@RequestMapping(value = "/startEpisode/{idEpisode}", method = RequestMethod.GET)
	public EpisodeDto startFilm(@PathVariable("idEpisode") Long idEpisode){
		EpisodeDto dto = episodeService.findOne(idEpisode);
		if(dto!=null && dto.getEpisodePath()!=null) {
			ProcessBuilder pb = new ProcessBuilder("C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe", dto.getEpisodePath());
			try {
				pb.start();
			} catch (IOException e) {
				dto.getErrores().add("Se ha producido un error al abrir el video");
				System.err.println("Se ha producido un error al intentar abrir el video");
				e.printStackTrace();
			}
		}		
		return dto;
	}
	
}
