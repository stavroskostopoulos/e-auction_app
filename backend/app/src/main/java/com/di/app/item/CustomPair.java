package com.di.app.item;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class CustomPair {
    private double[][] V;
    private double[][] F;

    public double[][] getV() {
        return V;
    }

    public double[][] getF() {
        return F;
    }
}
