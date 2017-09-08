package org.restWebService.RPlayer.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Season extends DomainEntity {
	
	private Integer number;
	private String name;
	@Temporal(TemporalType.TIMESTAMP)
	private Date realeaseDate;
	@Temporal(TemporalType.TIMESTAMP)
	private Date finishDate;
	@ManyToOne
	private Serie serie;
	
	public Integer getNumber() {
		return number;
	}
	
	public void setNumber(Integer number) {
		this.number = number;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getRealeaseDate() {
		return realeaseDate;
	}
	
	public void setRealeaseDate(Date realeaseDate) {
		this.realeaseDate = realeaseDate;
	}
	
	public Date getFinishDate() {
		return finishDate;
	}
	
	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}
	
	public Serie getSerie() {
		return serie;
	}
	
	public void setSerie(Serie serie) {
		this.serie = serie;
	}
	
}
