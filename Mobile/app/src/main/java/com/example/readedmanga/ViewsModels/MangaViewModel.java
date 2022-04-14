package com.example.readedmanga.ViewsModels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.example.readedmanga.Models.Manga;
import com.example.readedmanga.Repositories.MangaRepository;
import com.example.readedmanga.Repositories.TokenRepository;


public class MangaViewModel extends ViewModel {

    private TokenRepository tokenRepository = TokenRepository.getInstance();
    private MangaRepository mangaRepository = MangaRepository.getInstance();

    private MediatorLiveData<Manga> _manga = new MediatorLiveData<Manga>();

    private LiveData<Manga> manga = _manga;

    public LiveData<Manga> getManga() {
        return manga;
    }

    public void loadMangaAndTome() {
        _manga.setValue(mangaRepository.loadManga(tokenRepository.getToken().getValue(), 1).getValue());
    }

}
