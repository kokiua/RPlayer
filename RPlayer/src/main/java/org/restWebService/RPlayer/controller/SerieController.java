package org.restWebService.RPlayer.controller;

import java.util.List;

import org.restWebService.RPlayer.dto.SerieDto;
import org.restWebService.RPlayer.service.SerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("serie")
public class SerieController {
	
	@Autowired
	private SerieService serieService;
	
	@RequestMapping(value = "/findAllOrderByNameAsc", method = RequestMethod.GET)
	public List<SerieDto> findAllOrderByNameAsc(){
		return serieService.findAllOrderByNameAsc();
	}

}
