package org.restWebService.RPlayer.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Film extends DomainEntity {
	
	private String name;
	private String description;
	private Integer releaseYear;
	private Integer rate;
	private String trailerUrl;
	private byte[] image;
	private String path;
	@ManyToOne
	private FilmType filmType;
	
	public Film(){
		super();
	}
	
	public Film(String name, String description, Integer releaseYear, Integer rate, String trailerUrl, byte[] image, String path, FilmType filmType) {
		super();
		this.name = name;
		this.description = description;
		this.releaseYear = releaseYear;
		this.rate = rate;
		this.trailerUrl = trailerUrl;
		this.image = image;
		this.path = path;
		this.filmType = filmType;
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

	public Integer getReleaseYear() {
		return releaseYear;
	}

	public void setReleaseYear(Integer releaseYear) {
		this.releaseYear = releaseYear;
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
	
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public FilmType getFilmType() {
		return filmType;
	}
	
	public void setFilmType(FilmType filmType) {
		this.filmType = filmType;
	}
	
}
