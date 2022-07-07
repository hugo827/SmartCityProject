package com.example.readedmanga.Views.Activities;


import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ImageButton;


import com.example.readedmanga.R;
import com.example.readedmanga.Views.Fragments.ListMangasFragment;
import com.example.readedmanga.Views.Fragments.SearchFragment;



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
        ActionBar actionBar = getSupportActionBar();
        assert actionBar != null;
        actionBar.hide();
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