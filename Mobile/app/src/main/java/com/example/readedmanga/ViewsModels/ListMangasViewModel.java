package com.example.readedmanga.ViewsModels;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.example.readedmanga.Models.ReadedManga;
import com.example.readedmanga.Repositories.ReadedMangaRepository;
import com.example.readedmanga.Repositories.TokenRepository;

import java.util.List;

public class ListMangasViewModel extends ViewModel {

    private MediatorLiveData<List<ReadedManga>> _readedManga = new MediatorLiveData<>();
    private LiveData<List<ReadedManga>> readedManga = _readedManga;

    private MediatorLiveData<List<ReadedManga>> _searchManga = new MediatorLiveData<>();
    private LiveData<List<ReadedManga>> searchManga = _searchManga;

    private ReadedMangaRepository readedMangaRepository;
    private TokenRepository tokenRepository;

    public ListMangasViewModel(){
        readedMangaRepository = ReadedMangaRepository.getInstance();
        tokenRepository = TokenRepository.getInstance();
    }

    public LiveData<List<ReadedManga>> getReadedManga() {
        return readedManga;
    }
    public LiveData<List<ReadedManga>> getSearchManga() {
        return searchManga;
    }

    public void loadReadedManga() {
        _readedManga.setValue(readedMangaRepository.loadReadedManga(tokenRepository.getToken().getValue()).getValue());
    }

    public void loadSearchManga(String input) {
        _searchManga.setValue(readedMangaRepository.loadSearchManga(input).getValue());
    }

}
