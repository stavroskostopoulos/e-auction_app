package com.di.app.item;

import com.di.app.bid.BidService;
import com.di.app.user.User;
import com.di.app.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class RecommendationsService {
    private final ItemService itemService;
    private final UserService userService;
    private final BidService bidService;

    public double[][] randomArray(int N, int K) {
        double[][] array = new double[N][K];
        Random rand = new Random();
        for (int n = 0; n < N; n++){
            for (int k = 0; k < K; k++){
                array[n][k] = rand.nextDouble();
            }
        }
        return array;
    }

    public List<Item> getRecommendations(Long userId){

        User user = userService.GetUserById(userId).get();

        List<User> userList = userService.GetUsers();
        System.out.println(userList);

//        double[][] R = new double[N][M];

        return null;
    }


}
