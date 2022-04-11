package com.example.readedmanga.Repositories.Services;

import com.example.readedmanga.Models.LoginRequest;
import com.example.readedmanga.Models.SignUpRequest;
import com.example.readedmanga.Models.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Part;


public interface IDaoUser {

    @POST("account/login")
    Call<String> userLogin(@Body LoginRequest loginRequest);

    @GET("account/get/myaccount")
    Call<User> userInformation(@Header("authorization") String auth);

    @Headers({"Content-Type: multipart/form-data","Content-Type: text/plain"})
    @POST("account/inscription")
    Call<String> signUp(@Part SignUpRequest signUpRequest);


}
