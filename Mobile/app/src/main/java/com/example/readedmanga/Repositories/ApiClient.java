package com.example.readedmanga.Repositories;



import com.example.readedmanga.Repositories.Services.IDaoManga;
import com.example.readedmanga.Repositories.Services.IDaoReadedManga;
import com.example.readedmanga.Repositories.Services.IDaoUser;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ApiClient {

    private static Retrofit instance = null;
    private final static String ip = "192.168.0.30";
    private final static String port = "3001";

    private static Retrofit instance() {
        String url = "http://" + ip + ":" + port + "/";

//        OkHttpClient client = new OkHttpClient.Builder()
//                .addInterceptor(new ConnectivityCheckInterceptor(context))
//                .build();

        Retrofit retrofit = new Retrofit.Builder()
//                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl(url)
                .build();

        return retrofit;
    }

    private static Retrofit getRetrofit() {
        if(instance == null) instance = instance();
        return instance;
    }


    public static IDaoUser getUserApi() {
        return getRetrofit().create(IDaoUser.class);
    }

    public static IDaoManga getIDaoManga() {
        return getRetrofit().create(IDaoManga.class);
    }

    public static IDaoReadedManga getIDaoReadedManga() { return getRetrofit().create(IDaoReadedManga.class); }


}
