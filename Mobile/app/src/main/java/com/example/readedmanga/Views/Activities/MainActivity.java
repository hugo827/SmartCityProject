package com.example.readedmanga.Views.Activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.TextView;

import com.example.readedmanga.Models.Manga;
import com.example.readedmanga.R;
import com.example.readedmanga.Repositories.ApiClient;
import com.example.readedmanga.Repositories.Services.IDaoManga;
import com.example.readedmanga.Views.Fragments.ListMangasFragment;
import com.example.readedmanga.Views.Fragments.SearchFragment;
import com.google.android.material.navigation.NavigationView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private ImageButton btnSearch, btnListManga, btnProfile;
    private Boolean noChange = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnSearch = findViewById(R.id.btnSearchNav);
        btnListManga = findViewById(R.id.btnListMangaNav);
        btnProfile = findViewById(R.id.btnProfile);

        getSupportFragmentManager().beginTransaction().add(R.id.frameLayout, new SearchFragment()).commit();


        btnSearch.setOnClickListener(view -> {
                if(!noChange) {
                    getSupportFragmentManager().beginTransaction().replace(R.id.frameLayout, new SearchFragment()).commit();
                    noChange = true;
                }
        });

        btnListManga.setOnClickListener(view -> {
                if(noChange) {
                    getSupportFragmentManager().beginTransaction().replace(R.id.frameLayout, new ListMangasFragment()).commit();
                    noChange = false;
                }

        });

        btnProfile.setOnClickListener(view -> {
            Intent intent = new Intent(this, UserActivity.class);
            startActivity(intent);
        });

    }


}