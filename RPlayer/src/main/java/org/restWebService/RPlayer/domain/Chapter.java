package org.restWebService.RPlayer.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Chapter extends DomainEntity {
	
	private String name;
	private Integer number;
	private String path;
	@ManyToOne
	private Season season;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
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
