package com.example.readedmanga.Repositories.Services;


import com.example.readedmanga.Models.Manga;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface IDaoManga {

    @GET("manga/all/0")
    Call<List<Manga>> getManga();
}
