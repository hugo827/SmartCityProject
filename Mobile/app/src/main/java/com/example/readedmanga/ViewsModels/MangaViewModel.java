package com.example.readedmanga.ViewsModels;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.example.readedmanga.Models.Manga;
import com.example.readedmanga.Repositories.MangaRepository;
import com.example.readedmanga.Repositories.TokenRepository;


public class MangaViewModel extends ViewModel {

    private TokenRepository tokenRepository;
    private MangaRepository mangaRepository;

    private MediatorLiveData<Manga> _manga = new MediatorLiveData<Manga>();
    private LiveData<Manga> manga = _manga;


    public MangaViewModel() {
        tokenRepository = TokenRepository.getInstance();
        mangaRepository = MangaRepository.getInstance();
    }

    public LiveData<Manga> getManga() {
        return manga;
    }

    public void loadMangaAndTome(int manga_id) {
        Log.i("-------------------------------------", " 2 :" + tokenRepository.getToken().getValue() + "    id =" + manga_id);
        _manga.setValue(mangaRepository.loadManga(tokenRepository.getToken().getValue(), manga_id).getValue());

    }

}
