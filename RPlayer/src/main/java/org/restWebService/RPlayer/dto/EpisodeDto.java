package org.restWebService.RPlayer.dto;

public class EpisodeDto extends Dto {
	
	private Long idSeason;
	private Integer number;
	private String episodePath;
	
	public Long getIdSeason() {
		return idSeason;
	}
	
	public void setIdSeason(Long idSeason) {
		this.idSeason = idSeason;
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