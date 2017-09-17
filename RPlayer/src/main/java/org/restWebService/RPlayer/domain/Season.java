package org.restWebService.RPlayer.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Season extends DomainEntity {
	
	private Integer number;
	@ManyToOne
	private Serie serie;
	
	public Season() {
		super();
	}
	
	public Season(Integer number, Serie serie) {
		super();
		this.number = number;
		this.serie = serie;
	}

	public Integer getNumber() {
		return number;
	}
	
	public void setNumber(Integer number) {
		this.number = number;
	}
	
	public Serie getSerie() {
		return serie;
	}
	
	public void setSerie(Serie serie) {
		this.serie = serie;
	}
	
}
