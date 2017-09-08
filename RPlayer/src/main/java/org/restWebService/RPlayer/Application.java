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
//            	registry.addMapping("/bUser/register");
//              registry.addMapping("/login").exposedHeaders("Authorization");
//              registry.addMapping("/bUser/findListBUserToBeAdministrator/*");
//              registry.addMapping("/bUser/addBUserToOrganization/*/*");
//              registry.addMapping("/organization/create");
//              registry.addMapping("/organization/findAdministratedByPrincipal");
//              registry.addMapping("/organization/findDetailedOrganizationByIdOrganization/*");
//              registry.addMapping("/organization/deleteOrganizationByIdOrganization/*");
//              registry.addMapping("/team/create");
//              registry.addMapping("/team/findTeamsByIdOrganization/*");
//              registry.addMapping("/team/findDetailedTeamByIdTeam/*");
//              registry.addMapping("/team/deleteTeamByIdTeam/*");
//              registry.addMapping("/player/create");
//              registry.addMapping("/player/findPlayersByIdOrganization/*");
//              registry.addMapping("/player/findPlayersByIdTeam/*");
//              registry.addMapping("/player/addPlayerToTeam/*/*");
//              registry.addMapping("/player/findListPlayerToAddTeam/*");
//              registry.addMapping("/match/create");
            }
        };
    }
    
}
