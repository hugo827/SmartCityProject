package com.example.readedmanga.Views.RecyclerView;

import android.view.View;
import android.widget.CheckBox;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.readedmanga.R;

public class ListTomeViewHolder  extends RecyclerView.ViewHolder{

    public TextView tomeNB;
    public TextView titleTome;
    public TextView TV_readAt;
    public CheckBox cbReadAt;



    public ListTomeViewHolder(@NonNull View itemView) {
        super(itemView);

        tomeNB = itemView.findViewById(R.id.tomeNB);
        titleTome = itemView.findViewById(R.id.titleTome);
        TV_readAt = itemView.findViewById(R.id.TV_readAt);
        cbReadAt = itemView.findViewById(R.id.cbReadAt);

    }


}
