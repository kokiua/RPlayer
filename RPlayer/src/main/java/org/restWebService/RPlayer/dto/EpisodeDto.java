package org.restWebService.RPlayer.dto;

public class EpisodeDto extends Dto {
	
	private Long idSeason;
	private String name;
	private Integer number;
	private String path;
	
	public Long getIdSeason() {
		return idSeason;
	}
	
	public void setIdSeason(Long idSeason) {
		this.idSeason = idSeason;
	}
	
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

}
