package com.example.readedmanga.Repositories;

import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import com.example.readedmanga.Models.LoginRequest;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TokenRepository {

    private static TokenRepository instance = null;

    private MediatorLiveData<String> _tokenAuth = new MediatorLiveData<>();
    private LiveData<String> tokenAuth = _tokenAuth;



    private TokenRepository() {
    }

    public static TokenRepository getInstance() {
        if(instance == null ) instance = new TokenRepository();
        return instance;
    }

    public LiveData<String> setToken(LoginRequest loginRequest) {
        login(loginRequest);
        return tokenAuth;
    }

    public LiveData<String> getToken() {
        return  tokenAuth;
    }


    public void login(LoginRequest loginRequest) {

       Call<String> loginResponseCall = ApiClient.getUserApi().userLogin(loginRequest);

        loginResponseCall.enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                _tokenAuth.setValue(response.body());
            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {
                _tokenAuth.setValue("Failed");
                Log.i("FAILURE", t.getLocalizedMessage());
            }
        });
    }
}
