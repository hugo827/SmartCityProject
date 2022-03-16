package com.example.readedmanga;

import com.example.readedmanga.Login.LoginRequest;
import com.example.readedmanga.Login.LoginResponse;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface JSonPlaceHolderApi {

    @GET("manga/all/0")
    Call<List<GetPost>> getPosts();

    @POST("account/login")
    Call<LoginResponse> userLogin(@Body LoginRequest loginRequest);
}
