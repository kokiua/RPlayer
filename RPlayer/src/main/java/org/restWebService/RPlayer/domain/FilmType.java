package org.restWebService.RPlayer.domain;

import javax.persistence.Entity;

@Entity
public class FilmType extends DomainEntity {
	
	private String description;
	
	public FilmType(){
		super();
	}
	
	public FilmType(String description){
		super();
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
