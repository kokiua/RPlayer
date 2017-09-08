package org.restWebService.RPlayer.dto;

import java.util.Date;

public class SerieDto extends Dto {
	
	private String name;
	private Date releaseDate;
	private String description;
	private Byte[] image;
	
	public SerieDto(){
		super();
	}

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
