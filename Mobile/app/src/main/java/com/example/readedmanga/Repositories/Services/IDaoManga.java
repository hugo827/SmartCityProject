package com.example.readedmanga.Repositories.Services;


import com.example.readedmanga.Models.CallInfoManga;
import com.example.readedmanga.Models.InputSearch;
import com.example.readedmanga.Models.Manga;
import com.example.readedmanga.Models.ReadedManga;


import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface IDaoManga {

    @POST("user/manga")
    Call<Manga> getManga(@Header("authorization") String token, @Body CallInfoManga id_manga);

    @POST("user/search")
    Call<List<ReadedManga>> getSearchManga(@Body InputSearch input);

}
