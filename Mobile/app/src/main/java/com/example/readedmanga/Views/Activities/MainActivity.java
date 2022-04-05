package com.example.readedmanga.Views.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

import com.example.readedmanga.Models.Manga;
import com.example.readedmanga.R;
import com.example.readedmanga.Repositories.ApiClient;
import com.example.readedmanga.Repositories.Services.IDaoManga;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private TextView textViewResult;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textViewResult = findViewById(R.id.text_view_result);


        IDaoManga jSonPlaceHolderApi = ApiClient.getIDaoManga();

        Call<List<Manga>> call = jSonPlaceHolderApi.getManga();

        call.enqueue(new Callback<List<Manga>>() {
            @Override
            public void onResponse(Call<List<Manga>> call, Response<List<Manga>> response) {

                if(!response.isSuccessful()) {
                    textViewResult.setText("Code: " + response.code());
                    return;
                }
                    List<Manga> posts = response.body();
                    for (Manga post : posts) {
                        String content = "";
                        content += "ID: " + post.getId() + "\n";
                        content += "Title: " + post.getTitle() + "\n\n";
                        textViewResult.append(content);
                    }

            }

            @Override
            public void onFailure(Call<List<Manga>> call, Throwable t) {
                textViewResult.setText(t.getMessage());
            }
        });
    }
}