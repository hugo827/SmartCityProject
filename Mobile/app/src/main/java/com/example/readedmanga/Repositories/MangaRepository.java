package com.example.readedmanga.Repositories;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.example.readedmanga.Models.Manga;

import retrofit2.Call;

public class MangaRepository {

    private static MangaRepository instance = null;

    private MediatorLiveData<Manga> _manga = new MediatorLiveData<>();
    private LiveData<Manga> manga = _manga;

    private MangaRepository() {}

    public static MangaRepository getInstance() {
        if(instance == null) instance = new MangaRepository();
        return instance;
    }

    public LiveData<Manga> loadManga(String token, int id) {
        Call<Manga> mangaResponseCall = ApiClient.getIDaoManga().getManga(token, id);
        return manga;
    }



}
