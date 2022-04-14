package com.example.readedmanga.Repositories;


import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.example.readedmanga.Models.SignUpRequest;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class SignUpRepository {

    private static SignUpRepository instance = null;

    private MediatorLiveData<String> _signUp = new MediatorLiveData<>();
    private LiveData<String> signUp = _signUp;

    private SignUpRepository() {

    }

    public static SignUpRepository getInstance() {
        if(instance == null ) instance = new SignUpRepository();
        return instance;
    }

    public LiveData<String> setSignUp(SignUpRequest signUpRequest) {
        Call<String> response = ApiClient.getUserApi().signUp(
                signUpRequest.getLogin(), signUpRequest.getPassword(), signUpRequest.getEmail(), signUpRequest.getBirthdate(),
                signUpRequest.getPhone(),signUpRequest.getIsAdmin(), signUpRequest.getPicture()
        );

        response.enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                _signUp.setValue(response.body());
            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {
                _signUp.setValue("Failed");
                Log.i("FAILURE", t.getLocalizedMessage());
            }
        });

        return signUp;
    }

}
