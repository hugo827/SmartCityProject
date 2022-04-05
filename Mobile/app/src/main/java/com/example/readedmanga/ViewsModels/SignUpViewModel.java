package com.example.readedmanga.ViewsModels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.example.readedmanga.Models.SignUpRequest;
import com.example.readedmanga.Repositories.SignUpRepository;


public class SignUpViewModel extends ViewModel {

    private SignUpRepository signUpRepository = SignUpRepository.getInstance();

    private MediatorLiveData<String> _SignUp = new MediatorLiveData<>();
    private LiveData<String> signUp = _SignUp;

    public LiveData<String> getSignUp() {
        return signUp;
    }

    public void setSignUp(SignUpRequest signUpRequest) {
        _SignUp.setValue(signUpRepository.setSignUp(signUpRequest).getValue());
    }
}
