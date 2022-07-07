package com.example.readedmanga.Views.Activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.readedmanga.Models.Manga;
import com.example.readedmanga.Models.Tome;
import com.example.readedmanga.R;
import com.example.readedmanga.Views.RecyclerView.ListTomeAdpater;
import com.example.readedmanga.ViewsModels.MangaViewModel;

import java.util.ArrayList;
import java.util.List;

public class MangaActivity extends AppCompatActivity {

    private MangaViewModel mangaViewModel;

    private TextView author ;
    private TextView publisher ;
    private TextView genre ;
    private TextView subGenre;
    private TextView price;
    private TextView title;
    private ImageView picture;

    private RecyclerView listTomeRecyclerView;
    private List<Tome> tomeList;
    private ListTomeAdpater adpater;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_manga);
        initComponent();
        initMangaViewModel();


    }

    private void initMangaViewModel() {
        Bundle extras = getIntent().getExtras();

        mangaViewModel = new ViewModelProvider(this).get(MangaViewModel.class);
        mangaViewModel.loadMangaAndTome(extras.getInt("manga_id"));
        listTomeRecyclerView.setLayoutManager(new LinearLayoutManager(this.getApplicationContext()));
        listTomeRecyclerView.setItemAnimator(new DefaultItemAnimator());

        mangaViewModel.getManga().observe(this, m -> {
            if(m != null) {
                title.setText(m.getTitle());
                author.setText(m.getAuthor());
                publisher.setText(m.getPublisher());
                genre.setText(m.getSub_genre());
                subGenre.setText(m.getSub_genre());
                price.setText( m.getNew_price() + " ");
                Log.i("-------------------------------------", " 1 :" + m.getTomeList());
                tomeList = m.getTomeList();
                adpater = new ListTomeAdpater(tomeList);
                listTomeRecyclerView.setAdapter(adpater);
            }
        });


    }

    private void initComponent() {
         title = findViewById(R.id.titleManga);
         author = findViewById(R.id.author);
         publisher = findViewById(R.id.publisher);
         genre = findViewById(R.id.genre);
         subGenre = findViewById(R.id.subGenre);
         price = findViewById(R.id.price);
         listTomeRecyclerView = findViewById(R.id.listTomeRecyclerView);
         picture = findViewById(R.id.mangaPicture);
    }
}