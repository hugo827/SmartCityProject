package com.example.readedmanga;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {

    private static Retrofit getRetrofit() {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.0.18:3001/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        return retrofit;
    }

    public static JSonPlaceHolderApi  getJsonPlaceHolderApi() {

        JSonPlaceHolderApi  jSonPlaceHolderApi = getRetrofit().create(JSonPlaceHolderApi.class);

        return jSonPlaceHolderApi;
    }
}
