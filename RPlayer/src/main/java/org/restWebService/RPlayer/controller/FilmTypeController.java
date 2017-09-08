package org.restWebService.RPlayer.controller;

import java.util.List;

import org.restWebService.RPlayer.dto.FilmTypeDto;
import org.restWebService.RPlayer.service.FilmTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("filmType")
public class FilmTypeController {
	
	@Autowired
	private FilmTypeService filmTypeService;
	
	@RequestMapping(value = "/findAllOrderByDescriptionAsc", method = RequestMethod.GET)
	public List<FilmTypeDto> findAllOrderByDescriptionAsc(){
		return filmTypeService.findAllOrderByDescriptionAsc();
	}

}
