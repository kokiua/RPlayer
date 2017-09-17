package org.restWebService.RPlayer.domain;

import javax.persistence.Entity;

@Entity
public class Serie extends DomainEntity {
	
	private String name;
	private Integer releaseYear;
	private String description;
	private Byte[] image;
	
	public Serie() {
		super();
	}
	
	public Serie(String name, Integer releaseYear, String description, Byte[] image) {
		super();
		this.name = name;
		this.releaseYear = releaseYear;
		this.description = description;
		this.image = image;
	}

	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Integer getReleaseYear() {
		return releaseYear;
	}

	public void setReleaseYear(Integer releaseYear) {
		this.releaseYear = releaseYear;
	}

	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public Byte[] getImage() {
		return image;
	}
	
	public void setImage(Byte[] image) {
		this.image = image;
	}
	
}
