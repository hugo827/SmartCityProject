package com.example.readedmanga.Repositories;

import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.example.readedmanga.Models.User;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class UserRepository {

    //TODO : found how wait response from api


    private static UserRepository instance = null;

    private MediatorLiveData<User> _user = new MediatorLiveData<>();
    private LiveData<User> user = _user;

    private UserRepository() {

    }

    public static UserRepository getInstance() {
        if(instance == null ) instance = new UserRepository();
        return instance;
    }

    public LiveData<User> getUser(String token) {

        Call<User> userResponseCall = ApiClient.getUserApi().userInformation("Bearer " + token);

        userResponseCall.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                _user.setValue(response.body());
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.i("FAILURE", t.getLocalizedMessage());
            }
        });


        return user;
    }



}
