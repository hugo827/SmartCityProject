package com.example.readedmanga.ViewsModels;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MediatorLiveData;
import androidx.lifecycle.ViewModel;

import com.example.readedmanga.Models.ReadedManga;
import com.example.readedmanga.Repositories.ReadedMangaRepository;
import com.example.readedmanga.Repositories.TokenRepository;

import java.util.List;

public class ListMangasViewModel extends ViewModel {

    private MediatorLiveData<List<ReadedManga>> _readedManga = new MediatorLiveData<>();;
    private LiveData<List<ReadedManga>> readedManga = _readedManga;

    private ReadedMangaRepository readedMangaRepository = ReadedMangaRepository.getInstance();;
    private TokenRepository tokenRepository = TokenRepository.getInstance();

    public ListMangasViewModel(){ }

    public LiveData<List<ReadedManga>> getReadedManga() {
        return readedManga;
    }

    public void loadReadedManga() {
        _readedManga.setValue(readedMangaRepository.loadReadedManga(tokenRepository.getToken().getValue()).getValue());
    }

}
