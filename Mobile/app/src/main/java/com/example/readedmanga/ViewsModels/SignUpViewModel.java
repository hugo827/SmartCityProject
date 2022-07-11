package com.example.readedmanga.ViewsModels;


import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.example.readedmanga.Models.SignUpRequest;
import com.example.readedmanga.Repositories.SignUpRepository;


public class SignUpViewModel extends ViewModel {

    private SignUpRepository signUpRepository;

    private MediatorLiveData<String> _SignUp = new MediatorLiveData<>();
    private LiveData<String> signUp = _SignUp;

    public LiveData<String> getSignUp() {
        return signUp;
    }

    public SignUpViewModel() {
        signUpRepository = SignUpRepository.getInstance();
    }

    public void setSignUp(SignUpRequest signUpRequest) {
        Log.i("DEBUG", signUpRequest.getLogin() + " " + signUpRequest.getPhone());
        _SignUp.setValue(signUpRepository.setSignUp(signUpRequest).getValue());
    }
}
