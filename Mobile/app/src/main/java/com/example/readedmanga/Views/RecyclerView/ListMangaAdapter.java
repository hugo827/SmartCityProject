package com.example.readedmanga.Views.RecyclerView;

import android.annotation.SuppressLint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.readedmanga.Models.ReadedManga;
import com.example.readedmanga.R;

import java.util.List;

public class ListMangaAdapter extends RecyclerView.Adapter<ListMangaViewHolder> {


    private List<ReadedManga> myMangas;
    private IRecycleViewClickerListener listener;


    public ListMangaAdapter(List<ReadedManga> mangasList, IRecycleViewClickerListener listener) {
        this.myMangas = mangasList;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ListMangaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.linearlayout_manga, parent, false);
        return new ListMangaViewHolder(v, listener);
    }

    @Override
    public void onBindViewHolder(@NonNull ListMangaViewHolder holder, int position) {
        ReadedManga r = myMangas.get(position);
        holder.mangaName.setText(r.getTitle());
    }

    @Override
    public int getItemCount() {
        return myMangas == null ? 0 : myMangas.size();
    }


    @SuppressLint("NotifyDataSetChanged")
    public void setMyMangas(List<ReadedManga> myMangas) {
        this.myMangas = myMangas;
        notifyDataSetChanged();
    }

}
