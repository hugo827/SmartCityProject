package com.example.readedmanga.Views.Activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;

import com.example.readedmanga.R;
import com.example.readedmanga.ViewsModels.MangaViewModel;

public class MangaActivity extends AppCompatActivity {

    private MangaViewModel mangaViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_manga);
        initMangaViewModel();


    }

    private void initMangaViewModel() {
        mangaViewModel = new ViewModelProvider(this).get(MangaViewModel.class);
    }
}