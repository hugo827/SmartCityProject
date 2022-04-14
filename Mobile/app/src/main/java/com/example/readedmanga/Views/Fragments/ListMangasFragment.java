package com.example.readedmanga.Views.Fragments;

import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.readedmanga.R;
import com.example.readedmanga.ViewsModels.ListMangasViewModel;

public class ListMangasFragment extends Fragment {

    private ListMangasViewModel mViewModel;
    private RecyclerView listMangaRecyclerView;
    private ListMangasViewModel listMangasViewModel;


    public static ListMangasFragment newInstance() {
        return new ListMangasFragment();
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        mViewModel = new ViewModelProvider(this).get(ListMangasViewModel.class);
        View root = inflater.inflate(R.layout.list_mangas_fragment, container, false);

        listMangaRecyclerView = root.findViewById(R.id.ListMangaRV);

        listMangasViewModel.loadReadedManga();

        return root;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        mViewModel = new ViewModelProvider(this).get(ListMangasViewModel.class);
        // TODO: Use the ViewModel
    }

}