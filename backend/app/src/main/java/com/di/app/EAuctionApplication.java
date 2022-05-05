package com.di.app;

import com.di.app.user.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@SpringBootApplication
@RestController
public class EAuctionApplication {

	public static void main(String[] args) {
		SpringApplication.run(EAuctionApplication.class, args);

	}
//
//	@GetMapping
//	public String kk(){
//		return "ela";
//	}

	@GetMapping
	public List<User> kk2(){
		return List.of(
				new User(
					"kwstop",
					"nouabfa",
					"kost@gmail.com",
					1)
		);
	}

}
