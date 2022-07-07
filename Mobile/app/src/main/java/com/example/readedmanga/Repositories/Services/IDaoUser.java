package com.example.readedmanga.Repositories.Services;

import com.example.readedmanga.Models.LoginRequest;
import com.example.readedmanga.Models.User;


import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;


public interface IDaoUser {

    @POST("account/login")
    Call<String> userLogin(@Body LoginRequest loginRequest);

    @GET("account/get/myaccount")
    Call<User> userInformation(@Header("authorization") String token);

    @Multipart
    //@Headers("Accept: Multipart/form-data")
    @POST("account/inscription")
    Call<String> signUp(
                        @Part("login") RequestBody login,
                        @Part("pswd") RequestBody pswd,
                        @Part("email") RequestBody email,
                        @Part("birthdate") String birthdate,
                        @Part("phone") RequestBody phone,
                        @Part("is_admin") Boolean is_admin,
                        @Part("picture") RequestBody  picture
    );


}
