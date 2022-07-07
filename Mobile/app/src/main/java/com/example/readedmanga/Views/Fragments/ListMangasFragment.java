package com.example.readedmanga.Views.Fragments;

import androidx.lifecycle.ViewModelProvider;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


import com.example.readedmanga.Models.ReadedManga;
import com.example.readedmanga.R;
import com.example.readedmanga.Views.Activities.MangaActivity;
import com.example.readedmanga.Views.RecyclerView.IRecycleViewClickerListener;
import com.example.readedmanga.Views.RecyclerView.ListMangaAdapter;
import com.example.readedmanga.ViewsModels.ListMangasViewModel;

import java.util.ArrayList;
import java.util.List;

public class ListMangasFragment extends Fragment {


    private RecyclerView listMangaRecyclerView;
    private ListMangasViewModel listMangasViewModel;
    private List<ReadedManga> readedMangaList = new ArrayList<>();
    private IRecycleViewClickerListener listener;



    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        listMangasViewModel = new ViewModelProvider(this).get(ListMangasViewModel.class);
        View root = inflater.inflate(R.layout.list_mangas_fragment, container, false);
        listMangaRecyclerView = root.findViewById(R.id.ListMangaRV);
        listMangasViewModel.loadReadedManga();
        readedMangaList = listMangasViewModel.getReadedManga().getValue();

        listener = new RecyclerViewClickListener();

        ListMangaAdapter adapter = new ListMangaAdapter(readedMangaList, listener);
        listMangasViewModel.getReadedManga().observe(getViewLifecycleOwner(), adapter::setMyMangas);
        listMangaRecyclerView.setLayoutManager(new LinearLayoutManager(this.getActivity().getApplicationContext()));
        listMangaRecyclerView.setItemAnimator(new DefaultItemAnimator());
        listMangaRecyclerView.setAdapter(adapter);

        listMangasViewModel.loadReadedManga();

        return root;
    }



    private class RecyclerViewClickListener implements IRecycleViewClickerListener {

        @Override
        public void onClick(View v, int position) {
            Intent intent = new Intent(getActivity(), MangaActivity.class);
            intent.putExtra("manga_id", readedMangaList.get(position).getId_manga());
            startActivity(intent);
        }
    }

}