package org.restWebService.RPlayer.dto;

import java.util.Date;

public class FilmDto extends Dto {
	
	private String name;
	private String description;
	private Date realeaseDate;
	private Integer rate;
	private String trailerUrl;
	private byte[] image;
	private String filmPath;
	private FilmTypeDto filmTypeDto;
	
	public FilmDto(){
		super();
		filmTypeDto = new FilmTypeDto();
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Date getRealeaseDate() {
		return realeaseDate;
	}
	
	public void setRealeaseDate(Date realeaseDate) {
		this.realeaseDate = realeaseDate;
	}
	
	public Integer getRate() {
		return rate;
	}
	
	public void setRate(Integer rate) {
		this.rate = rate;
	}
	
	public String getTrailerUrl() {
		return trailerUrl;
	}
	
	public void setTrailerUrl(String trailerUrl) {
		this.trailerUrl = trailerUrl;
	}
	
	public byte[] getImage() {
		return image;
	}
	
	public void setImage(byte[] image) {
		this.image = image;
	}
	
	public String getFilmPath() {
		return filmPath;
	}

	public void setFilmPath(String filmPath) {
		this.filmPath = filmPath;
	}

	public FilmTypeDto getFilmTypeDto() {
		return filmTypeDto;
	}
	
	public void setFilmTypeDto(FilmTypeDto filmTypeDto) {
		this.filmTypeDto = filmTypeDto;
	}
	
}
