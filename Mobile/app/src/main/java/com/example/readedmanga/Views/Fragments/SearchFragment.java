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
import android.widget.SearchView;

import com.example.readedmanga.Models.ReadedManga;
import com.example.readedmanga.R;
import com.example.readedmanga.Views.Activities.MangaActivity;
import com.example.readedmanga.Views.RecyclerView.IRecycleViewClickerListener;
import com.example.readedmanga.Views.RecyclerView.ListMangaAdapter;
import com.example.readedmanga.ViewsModels.ListMangasViewModel;

import java.util.ArrayList;
import java.util.List;

public class SearchFragment extends Fragment {

    private ListMangasViewModel listMangasViewModel;
    private SearchView searchView;
    private RecyclerView recyclerView;
    private List<ReadedManga> searchMangaList = new ArrayList<>();
    private IRecycleViewClickerListener listener;

    public static SearchFragment newInstance() {
        return new SearchFragment();
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        listMangasViewModel = new ViewModelProvider(this).get(ListMangasViewModel.class);
        View v = inflater.inflate(R.layout.search_fragment, container, false);
        searchView = v.findViewById(R.id.Search_View);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String s) {
                listMangasViewModel.loadSearchManga(s);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String s) {
                return false;
            }
        });

        recyclerView = v.findViewById(R.id.listMangaSearchRV);
        listener = new RecyclerViewClickListener();

        ListMangaAdapter adapter = new ListMangaAdapter(searchMangaList, listener);
        listMangasViewModel.getSearchManga().observe(getViewLifecycleOwner(), adapter::setMyMangas);
        recyclerView.setLayoutManager(new LinearLayoutManager(this.getActivity().getApplicationContext()));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setAdapter(adapter);


        return v;
    }

    private class RecyclerViewClickListener implements IRecycleViewClickerListener {

        @Override
        public void onClick(View v, int position) {
            Intent intent = new Intent(getActivity(), MangaActivity.class);
            intent.putExtra("manga_id", searchMangaList.get(position).getId_manga());
            startActivity(intent);
        }
    }
}