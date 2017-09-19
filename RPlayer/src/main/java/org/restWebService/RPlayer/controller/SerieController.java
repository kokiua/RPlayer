package org.restWebService.RPlayer.controller;

import java.io.IOException;
import java.util.List;

import org.restWebService.RPlayer.dto.SerieDto;
import org.restWebService.RPlayer.service.SerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("serie")
public class SerieController {
	
	@Autowired
	private SerieService serieService;
	
	@RequestMapping(value = "/findAllOrderByNameAsc", method = RequestMethod.GET)
	public List<SerieDto> findAllOrderByNameAsc(){
		return serieService.findAllOrderByNameAsc();
	}
	
	@RequestMapping(value = "/findOne/{idSerie}", method = RequestMethod.GET)
	public SerieDto findOne(@PathVariable("idSerie") Long idSerie){
		return serieService.findOne(idSerie);
	}
	
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public SerieDto save(@RequestBody SerieDto serieDto){
		return serieService.save(serieDto);
	}
	
	@RequestMapping(value = "/uploadImage/{idSerie}", method = RequestMethod.POST)
	public SerieDto uploadImage(@PathVariable("idSerie") Long idSerie, @RequestParam MultipartFile file) {
		SerieDto res = new SerieDto();
		try { 
			byte [] image = file.getBytes();
			res = serieService.uploadFilmImage(idSerie, image);
		} catch (IOException e) {
			System.err.println("Se ha producido un error");
			e.printStackTrace();
		}
		return res;
	}

}
