package com.example.readedmanga.Views.Activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.readedmanga.R;
import com.example.readedmanga.Models.LoginRequest;
import com.example.readedmanga.ViewsModels.LoginViewModel;


public class LoginActivity extends AppCompatActivity {

    private EditText login;
    private EditText pswd;
    private Button btnLogin;
    private LoginViewModel loginViewModel;
    private Button btnInscription;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        login = findViewById(R.id.Login);
        pswd = findViewById(R.id.Password);
        btnLogin = findViewById(R.id.Connexion);
        btnInscription = findViewById(R.id.inscription);

        loginViewModel = new ViewModelProvider(this).get(LoginViewModel.class);

        loginViewModel.getToken().observe(this, strToken -> {
                    if(strToken == null || strToken.equals("Failed")) {
                        Toast.makeText(LoginActivity.this, "Login failed ", Toast.LENGTH_LONG).show();

                    } else {
                        Toast.makeText(LoginActivity.this, "Login success", Toast.LENGTH_LONG).show();
                        Intent intent = new Intent(this, MainActivity.class);
                        startActivity(intent);
                    }
                }
        );

        btnLogin.setOnClickListener(view ->  {
            if (TextUtils.isEmpty(login.getText().toString()) || TextUtils.isEmpty(pswd.getText().toString())) {
                Toast.makeText(LoginActivity.this, "Login / Password Required", Toast.LENGTH_LONG).show();
            } else {
                loginViewModel.setToken(new LoginRequest(login.getText().toString(), pswd.getText().toString()));
            }
        });

        btnInscription.setOnClickListener( view ->  {
            Intent intent = new Intent(this, SignUpActivity.class);
            startActivity(intent);
        });

    }

}