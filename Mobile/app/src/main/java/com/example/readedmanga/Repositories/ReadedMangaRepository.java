package com.example.readedmanga.Repositories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.example.readedmanga.Models.ReadedManga;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ReadedMangaRepository {

    private static ReadedMangaRepository instance = null;

    private MediatorLiveData<List<ReadedManga>> _readedManga = new MediatorLiveData<>();
    private LiveData<List<ReadedManga>> readedManga = _readedManga;

    private ReadedMangaRepository() {}

    public static ReadedMangaRepository getInstance() {
        if(instance == null) instance = new ReadedMangaRepository();
        return instance;
    }

    public LiveData<List<ReadedManga>> loadReadedManga(String token) {
        Call<List<ReadedManga>> responseCall = ApiClient.getIDaoReadedManga().loadReadedManga(token);

        responseCall.enqueue(new Callback<List<ReadedManga>>() {
            @Override
            public void onResponse(Call<List<ReadedManga>> call, Response<List<ReadedManga>> response) {
                _readedManga.setValue(response.body());
            }

            @Override
            public void onFailure(Call<List<ReadedManga>> call, Throwable t) {

            }
        });

        return readedManga;
    }
}
