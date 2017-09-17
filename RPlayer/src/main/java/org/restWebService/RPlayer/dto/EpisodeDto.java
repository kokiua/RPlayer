package org.restWebService.RPlayer.dto;

public class EpisodeDto extends Dto {
	
	private Long idSeason;
	private String name;
	private Integer number;
	private String episodePath;
	
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

	public String getEpisodePath() {
		return episodePath;
	}

	public void setEpisodePath(String episodePath) {
		this.episodePath = episodePath;
	}
	
}
