package com.example.readedmanga.Views.Activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.readedmanga.R;
import com.example.readedmanga.ViewsModels.UserViewModel;

import java.util.concurrent.atomic.AtomicReference;

public class UserActivity extends AppCompatActivity {

    private ImageView userPicture;
    private TextView login, phone, email, birthdate;
    private UserViewModel userViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);

        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);

        userPicture = findViewById(R.id.UserPicture);
        login = findViewById(R.id.UserLogin);
        phone = findViewById(R.id.UserPhone);
        email = findViewById(R.id.UserEmail);
        birthdate = findViewById(R.id.UserBirthDate);


        userViewModel.getUser().observe( this, user -> {
            if(user != null) {
                login.setText(user.getLogin());
                phone.setText(user.getPhone());
                email.setText(user.getEmail());
                birthdate.setText(user.getBirthdate());
                userPicture.setImageResource(R.drawable.icon_user);
            }
        });

        userViewModel.setUser();
    }
}