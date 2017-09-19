package org.restWebService.RPlayer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
            	// EJEMPLO DE CORS
            	registry.addMapping("/filmType/findAllOrderByDescriptionAsc");
            	registry.addMapping("/film/findAllOrderByNameAsc");
            	registry.addMapping("/film/findOne/*");
            	registry.addMapping("/film/delete/*");
            	registry.addMapping("/film/save");
            	registry.addMapping("/film/uploadImage/*");
            	registry.addMapping("/film/startFilm/*");
            	registry.addMapping("/serie/findAllOrderByNameAsc");
            	registry.addMapping("/serie/findOne/*");
            	registry.addMapping("/serie/save");
            	registry.addMapping("/serie/delete/*");
            	registry.addMapping("/serie/uploadImage/*");
            	registry.addMapping("/season/findByIdSerieOrderByNumberASC/*");
            	registry.addMapping("/season/delete/*");
            	registry.addMapping("/episode/findByIdSeasonOrderByNumberAsc/*");
            	registry.addMapping("/episode/startEpisode/*");
            	registry.addMapping("/episode/delete/*");
            }
        };
    }
    
}
