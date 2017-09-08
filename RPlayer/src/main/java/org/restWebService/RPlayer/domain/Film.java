package org.restWebService.RPlayer.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Film extends DomainEntity {
	
	private String name;
	private String description;
	@Temporal(TemporalType.TIMESTAMP)
	private Date realeaseDate;
	private Integer rate;
	private String trailerUrl;
	private Byte[] image;
	private String path;
	@ManyToOne
	private FilmType filmType;
	
	public Film(){
		super();
	}
	
	public Film(String name, String description, Date realeaseDate, Integer rate, String trailerUrl, Byte[] image, String path, FilmType filmType) {
		super();
		this.name = name;
		this.description = description;
		this.realeaseDate = realeaseDate;
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
	
	public Byte[] getImage() {
		return image;
	}
	
	public void setImage(Byte[] image) {
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
