package com.example.readedmanga.Repositories.Services;

import com.example.readedmanga.Models.ReadedManga;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;

public interface IDaoReadedManga {

    @GET("user/listownmanga")
    Call<List<ReadedManga>> loadReadedManga(@Header("authorization") String token);

}
