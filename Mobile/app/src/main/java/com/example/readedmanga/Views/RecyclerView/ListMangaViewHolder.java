package com.example.readedmanga.Views.RecyclerView;

import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.readedmanga.R;
import com.example.readedmanga.Views.RecyclerView.IRecycleViewClickerListener;

public class ListMangaViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

    public TextView mangaName;
    private IRecycleViewClickerListener listener;


    public ListMangaViewHolder(@NonNull View itemView, IRecycleViewClickerListener listener) {
        super(itemView);
        this.listener = listener;
        mangaName = itemView.findViewById(R.id.title_manga);
        itemView.setOnClickListener(this);

    }

    @Override
    public void onClick(View view) {
        listener.onClick(view, getAdapterPosition());
    }
}
