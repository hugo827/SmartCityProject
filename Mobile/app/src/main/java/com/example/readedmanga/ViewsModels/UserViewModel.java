package com.example.readedmanga.ViewsModels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.example.readedmanga.Models.User;
import com.example.readedmanga.Repositories.UserRepository;

public class UserViewModel {

    private UserRepository userRepository = UserRepository.getInstance();

    private MediatorLiveData<User> _user = new MediatorLiveData<>();
    private LiveData<User> user = _user;


    public LiveData<User> getUser() {
        return user;
    }

    public void setUser() {
        _user.setValue(userRepository.getUser().getValue());
    }
}
