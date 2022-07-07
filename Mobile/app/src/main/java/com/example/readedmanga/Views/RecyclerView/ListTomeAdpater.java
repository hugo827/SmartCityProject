package com.example.readedmanga.Views.RecyclerView;

import android.annotation.SuppressLint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;


import com.example.readedmanga.Models.Tome;
import com.example.readedmanga.R;

import java.util.List;


public class ListTomeAdpater extends RecyclerView.Adapter<ListTomeViewHolder> {


    private List<Tome> myTomes;


    public ListTomeAdpater(List<Tome> tomeList) {
        this.myTomes = tomeList;

    }

    @NonNull
    @Override
    public ListTomeViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.linearlayout_tome, parent, false);
        return new ListTomeViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ListTomeViewHolder holder, int position) {
        Tome t = myTomes.get(position);
        holder.TV_readAt.setText(t.getRead_at() != null ? t.getRead_at() : "");
        holder.cbReadAt.setChecked(t.getRead_at() != null);
        holder.titleTome.setText(t.getTitle());
        holder.tomeNB.setText(t.getNumber() + ")");
    }


    @Override
    public int getItemCount() {
        return myTomes == null ? 0 : myTomes.size();
    }


    @SuppressLint("NotifyDataSetChanged")
    public void setMyMangas(List<Tome> myTomes) {
        this.myTomes = myTomes;
        notifyDataSetChanged();
    }

}
