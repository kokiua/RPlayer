package org.restWebService.RPlayer.dto;

public class SeasonDto extends Dto {

	private Long idSerie;
	private Integer number;
	
	public SeasonDto(){
		super();
	}

	public Long getIdSerie() {
		return idSerie;
	}

	public void setIdSerie(Long idSerie) {
		this.idSerie = idSerie;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

}
