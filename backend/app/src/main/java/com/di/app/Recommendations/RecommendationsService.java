package com.di.app.Recommendations;

import com.di.app.bid.BidService;
import com.di.app.item.CustomPair;
import com.di.app.item.Item;
import com.di.app.item.ItemService;
import com.di.app.user.User;
import com.di.app.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class RecommendationsService {
    private final ItemService itemService;
    private final UserService userService;
    private final BidService bidService;

    private final RecommendationsRepo recommendationsRepo;

    public List<Item> getRecommendations(Long userId) {
        return recommendationsRepo.getById(userId).getItemList();
    }

    public boolean loadRecommendations(Long userId) {
        // if exists don't compute
        boolean exists = recommendationsRepo.existsById(userId);
        if(exists){
            Recommended s = recommendationsRepo.getById(userId);
            return true;
        }

        List<User> userList = userService.GetUsers();
        List<Item> itemList = itemService.GetItems();

        int N = userList.size();
        int M = itemList.size();

        double[][] R = new double[N][M];

        // Initialize R
        for (int i = 0; i < N; i++){
            for (int j = 0; j < M; j++){
                R[i][j] = 0.0;
            }
        }

        List<Item> itemsBid = null;
        for (int i = 0; i < N; i++) {
            // Get the items the user bid on
            itemsBid = bidService.GetBidsOfBidder(userList.get(i).getId());

            for (Item item : itemsBid) {
                int itemId = item.getItemId().intValue();

                // Add for every bid in an auction
                R[i][itemId-1] += 2.0;
            }

            itemsBid.clear();
        }

        int K = 7;

        double[][] V = randomArray(N,K);
        double[][] F = randomArray(M,K);


        CustomPair p = matrixFactorization(R,V,F,K);

        V = p.getV();
        F = Transpose(p.getF());

        // V*F
        double[][] Xpredicted = dot2D(V,F);

//        for (int i = 0; i < N; i++){
//            for (int j = 0; j < M; j++){
//                System.out.print(Xpredicted[i][j]+" ");
//            }
//            System.out.println();
//        }


        List<Double> topRatingList = new ArrayList<>();
        for (int i=0; i<5; i++){
            topRatingList.add(0.0);
        }
        //Map<Double, Map.Entry<Integer, Integer>> topItemList = new HashMap<Double, Map.Entry<Integer, Integer>>();
        Map<Double,Integer> topItemList = new HashMap<>();

        for (int i = 0; i < N; i++){
            for (int j = 0; j < M; j++){

                for (int k = 0; k < 5; k++){
                    double rating = topRatingList.get(k);
                    // Keep top 5 items
                    if (Xpredicted[i][j] > rating) {
                        topRatingList.remove(rating);
                        topRatingList.add(Xpredicted[i][j]);

                        topItemList.remove(rating);
                        topItemList.put(Xpredicted[i][j], j);
                        //topItemList.put(Xpredicted[i][j], new AbstractMap.SimpleEntry(i, j));

                        break;
                    }
                }
            }
        }
        //System.out.println(topRatingList);
        System.out.println(topItemList);

        List<Item> top5Items = new ArrayList<>();

        for (Double i : topItemList.keySet()) {
            Item curItem = itemList.get(topItemList.get(i));
            if(!top5Items.contains(curItem)){
                top5Items.add(itemList.get(topItemList.get(i)));
            }
            else{
                if(!top5Items.contains(itemList.get(topItemList.get(i)-1))) {
                    top5Items.add(itemList.get(topItemList.get(i)-1));
                }
                else {
                    top5Items.add(itemList.get(topItemList.get(i)-2));
                }
            }
        }

        Set<Item> set = new HashSet<>(top5Items);
        top5Items.clear();
        top5Items.addAll(set);

        for (Item i : top5Items){
            System.out.println(i);
        }

        Recommended s = new Recommended(userId, top5Items);
        recommendationsRepo.save(s);

        return true;
    }

    public CustomPair matrixFactorization(double[][] R, double[][] V, double[][] F, int K){
        double alpha = (double)0.05;
        double beta = (double)0.0002;
        int iterations = 5000;


        // Transpose F
        F = Transpose(F);

        double eij;
        int count = 0;
        for (int iter = 0; iter < iterations; iter++) {

            for (int i = 0; i < R.length; i++) {
                for (int j = 0; j < R[0].length; j++) {
                    if (R[i][j] > 0) {
                        // Calculate error
                        eij = R[i][j] - dot(getRow(V, i), getColumn(F, j));
//                        System.out.println(eij);
                        for (int k = 0; k < K; k++) {
                            V[i][k] = V[i][k] + alpha * (2 * eij * F[k][j] - beta * V[i][k]);
                            F[k][j] = F[k][j] + alpha * (2 * eij * V[i][k] - beta * F[k][j]);
                        }
                    }
                }
            }


            double e = 0.0;
            for (int i = 0; i < R.length; i++) {
                for (int j = 0; j < R[0].length; j++) {
                    // If R value significant
                    if (R[i][j] > 0) {
                        // e = e + (R - dot(V[i,:],F[:,j]))^2
                        e += (R[i][j] - dot(getRow(V, i), getColumn(F, j))) * (R[i][j] - dot(getRow(V, i), getColumn(F, j)));

                        for(int k = 0; k < K; k++){
                            // e = e + (beta/2) * V[i][k]^2 + F[k][j]^2
                            e += (beta / 2) * ((V[i][k]*V[i][k]) + (F[k][j]*F[k][j]));
                        }

                    }
                }
            }
            count++;
            if(count >= 1000){
                System.out.println("error: "+e);
                count = 0;
            }
        }


        CustomPair pair = new CustomPair(V,Transpose(F));
        return pair;
    }

    // Transpose array
    public double[][] Transpose(double[][] F){
        double[][] TransposedF = new double[F[0].length][F.length];

        for ( int i = 0; i < F[0].length ; i++){
            for ( int j = 0; j < F.length ; j++){
                TransposedF[i][j] = F[j][i];
            }
        }
        return TransposedF;
    }

    // Equivalent to numpy dot(dot product of two arrays - eswteriko ginomeno)
    public double dot(double[] x, double[] y) {
        double sum = 0.0;
        for (int i = 0; i < x.length; i++) {
            sum = sum + x[i] * y[i];
        }
        return sum;
    }

    public double[][] dot2D(double[][] x, double[][] y) {
        double[][] dot = new double[x.length][y[0].length];

        for(int i = 0; i < x.length; i++) {
            for (int j = 0; j < y[0].length; j++) {
                for (int k = 0; k < y.length; k++) {
                    dot[i][j] = dot[i][j] + x[i][k] * y[k][j];
                }
            }
        }
        return dot;
    }

    public double[] getColumn(double[][] array, int j){
        double[] column = new double[array.length];

        for (int i=0; i < column.length; i++){
            column[i] = array[i][j];
        }
        return column;
    }

    public double[] getRow(double[][] array, int i){
        double[] row = new double[array[0].length];

        for (int j = 0; j < row.length; j++){
            row[j] = array[i][j];
        }
        return row;
    }

    // random array with double values [0-1], size N x M
    public double[][] randomArray(int N, int M) {
        double[][] array = new double[N][M];
        Random rand = new Random();
        for (int n = 0; n < N; n++){
            for (int m = 0; m < M; m++){
                array[n][m] = rand.nextDouble();
            }
        }
        return array;
    }


}
