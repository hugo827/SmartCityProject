package com.example.readedmanga.ViewsModels;


import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.example.readedmanga.Models.LoginRequest;
import com.example.readedmanga.Repositories.TokenRepository;


public class LoginViewModel extends ViewModel {

    private TokenRepository tokenRepository;

    private MediatorLiveData<String> _token = new MediatorLiveData<>();
    private LiveData<String> token = _token;

    public LoginViewModel() {
        tokenRepository = TokenRepository.getInstance();
    }

    public LiveData<String> getToken() {
        return token;
    }

    public void setToken(LoginRequest loginRequest) {
        _token.setValue(tokenRepository.setToken(loginRequest).getValue());
    }


}
