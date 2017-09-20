package org.restWebService.RPlayer.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Episode extends DomainEntity {
	
	private Integer number;
	private String path;
	@ManyToOne
	private Season season;
	
	public Episode() {
		super();
	}
	
	public Episode(Integer number, String path, Season season) {
		super();
		this.number = number;
		this.path = path;
		this.season = season;
	}
	
	public Integer getNumber() {
		return number;
	}
	
	public void setNumber(Integer number) {
		this.number = number;
	}
	
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Season getSeason() {
		return season;
	}
	
	public void setSeason(Season season) {
		this.season = season;
	}

}
