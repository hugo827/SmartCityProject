package com.example.readedmanga.Repositories;


import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;

import com.example.readedmanga.Models.CallInfoManga;
import com.example.readedmanga.Models.Manga;



import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MangaRepository {

    private static MangaRepository instance = null;

    private MediatorLiveData<Manga> _manga = new MediatorLiveData<>();
    private LiveData<Manga> manga = _manga;

    private MangaRepository() {

    }

    public static MangaRepository getInstance() {
        if(instance == null) instance = new MangaRepository();
        return instance;
    }

    public LiveData<Manga> loadManga(String token, int id) {

        Call<Manga> mangaResponseCall = ApiClient.getIDaoManga().getManga("Bearer " + token, new CallInfoManga(id));

        mangaResponseCall.enqueue(new Callback<Manga>() {
            @Override
            public void onResponse(Call<Manga> call, Response<Manga> response) {
                 _manga.setValue(response.body());
            }

            @Override
            public void onFailure(Call<Manga> call, Throwable t) {
                Log.i("-------------------------------FAILURE", t.getLocalizedMessage());
            }
        });
        return manga;
    }

}
