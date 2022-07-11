package com.example.readedmanga.Repositories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.example.readedmanga.Models.SignUpRequest;

import okhttp3.MediaType;
import okhttp3.RequestBody;
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

        RequestBody loginBody = RequestBody.create(MediaType.parse("text/plain"),  signUpRequest.getLogin()) ;
        RequestBody passwordBody = RequestBody.create(MediaType.parse("text/plain"),  signUpRequest.getPassword());
        RequestBody emailBody = RequestBody.create(MediaType.parse("text/plain"),  signUpRequest.getEmail());
        RequestBody phoneBody = RequestBody.create(MediaType.parse("text/plain"),  signUpRequest.getPhone());
        RequestBody pictureBody = signUpRequest.getPicture() != null ? RequestBody.create(MediaType.parse("text/plain"), signUpRequest.getPicture()) : null;

        Call<String> response = ApiClient.getUserApi().signUp(
                loginBody,passwordBody, emailBody , signUpRequest.getBirthdate() ,phoneBody
               ,signUpRequest.getIsAdmin(), null
        );

        response.enqueue(new Callback<String>() {
            @Override
            public void onResponse(Call<String> call, Response<String> response) {
                _signUp.setValue(response.body());
            }

            @Override
            public void onFailure(Call<String> call, Throwable t) {
                _signUp.setValue("Failed");
            }
        });

        return signUp;
    }

}
