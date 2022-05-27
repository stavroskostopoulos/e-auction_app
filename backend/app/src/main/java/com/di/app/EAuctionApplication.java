package com.di.app;

import com.di.app.role.Role;
import com.di.app.user.User;
import com.di.app.user.UserService;
import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;


@SpringBootApplication
@RestController
//@CrossOrigin(origins = "*")
public class EAuctionApplication {

	public static void main(String[] args) {
		SpringApplication.run(EAuctionApplication.class, args);

	}

	@Bean
	CommandLineRunner run(UserService userService){
		return args -> {
			userService.SaveRole(new Role(null, "ADMIN"));
			userService.SaveRole(new Role(null, "SELLER"));
			userService.SaveRole(new Role(null, "BIDDER"));
			userService.SaveRole(new Role(null, "GUEST"));

			userService.SaveUser(new User(
					null,
					"kapphs",
					"kwdikos",
					"sss@gmail.com",
					"Kwstas",
					"Kopos",
					"6988772829",
					"23323",
					new ArrayList<>()

			));

			userService.SaveUser(new User(null,
                    "nota",
                    "nouabfa",
                    "nota@gmail.com",
                    "Noths",
                    "Stam",
                    "6952252",
                    "222222",
                    new ArrayList<>()
            ));

			userService.GiveRole("kapphs", "SELLER");
			userService.GiveRole("kapphs", "BIDDER");
			userService.GiveRole("nota", "ADMIN");

		};
	}


	@Bean
	public ServletWebServerFactory servletContainer() {
		// Enable SSL Traffic
		TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
			@Override
			protected void postProcessContext(Context context) {
				SecurityConstraint securityConstraint = new SecurityConstraint();
				securityConstraint.setUserConstraint("CONFIDENTIAL");
				SecurityCollection collection = new SecurityCollection();
				collection.addPattern("/*");
				securityConstraint.addCollection(collection);
				context.addConstraint(securityConstraint);
			}
		};

		tomcat.addAdditionalTomcatConnectors(httpToHttpsRedirectConnector());
		return tomcat;
	}

    // Redirect from HTTP 8080 to HTTPS 8443
	private Connector httpToHttpsRedirectConnector() {
		Connector connector = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
		connector.setScheme("http");
		connector.setPort(8080);
		connector.setSecure(false);
		connector.setRedirectPort(8443);
		return connector;
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/*").allowedOrigins("*");
			}
		};
	}
}
