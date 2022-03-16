package com.example.readedmanga;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private TextView textViewResult;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        textViewResult = findViewById(R.id.text_view_result);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.0.18:3001/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        JSonPlaceHolderApi jSonPlaceHolderApi = retrofit.create(JSonPlaceHolderApi.class);

        Call<List<GetPost>> call = jSonPlaceHolderApi.getPosts();

        call.enqueue(new Callback<List<GetPost>>() {
            @Override
            public void onResponse(Call<List<GetPost>> call, Response<List<GetPost>> response) {

                if(!response.isSuccessful()) {
                    textViewResult.setText("Code: " + response.code());
                    return;
                }
                    List<GetPost> posts = response.body();
                    for (GetPost post : posts) {
                        String content = "";
                        content += "ID: " + post.getId() + "\n";
                        content += "Title: " + post.getTitle() + "\n\n";
                        textViewResult.append(content);
                    }

            }

            @Override
            public void onFailure(Call<List<GetPost>> call, Throwable t) {
                textViewResult.setText(t.getMessage());
            }
        });
    }
}