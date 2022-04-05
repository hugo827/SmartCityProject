package com.example.readedmanga.ViewsModels;


import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.example.readedmanga.Models.LoginRequest;
import com.example.readedmanga.Repositories.TokenRepository;


public class LoginViewModel extends ViewModel {

    private TokenRepository tokenRepository = TokenRepository.getInstance();

    private MediatorLiveData<String> _token = new MediatorLiveData<>();
    private LiveData<String> token = _token;


    public LiveData<String> getToken() {
        return token;
    }

    public void setToken(LoginRequest loginRequest) {
        _token.setValue(tokenRepository.getToken(loginRequest).getValue());
    }


}
