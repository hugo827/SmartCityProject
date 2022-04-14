package com.example.readedmanga.Repositories.Services;


import com.example.readedmanga.Models.Manga;


import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Path;

public interface IDaoManga {

    // TODO : a faire dans le backend NODEJS
    @GET("user/viewmanga")
    Call<Manga> getManga(@Header("authorization") String token, @Path("id") int id  );
}
