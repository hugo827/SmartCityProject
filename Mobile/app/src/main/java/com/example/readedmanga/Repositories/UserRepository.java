package com.example.readedmanga.Repositories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.example.readedmanga.Models.User;



public class UserRepository {

    private static UserRepository instance = null;

    private MediatorLiveData<User> _user = new MediatorLiveData<>();
    private LiveData<User> user = _user;

    private UserRepository() {

    }

    public static UserRepository getInstance() {
        if(instance == null ) instance = new UserRepository();
        return instance;
    }

    public LiveData<User> getUser() {
        return user;
    }



}
