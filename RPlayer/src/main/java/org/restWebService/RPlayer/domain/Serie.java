package org.restWebService.RPlayer.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Serie extends DomainEntity {
	
	private String name;
	@Temporal(TemporalType.TIMESTAMP)
	private Date releaseDate;
	private String description;
	private Byte[] image;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
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
