package com.example.readedmanga.Login;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.readedmanga.ApiClient;
import com.example.readedmanga.MainActivity;
import com.example.readedmanga.R;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class LoginActivity extends AppCompatActivity {

    private EditText login;
    private EditText pswd;
    private Button btnLogin;
    private TextView res;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        login = findViewById(R.id.Login);
        pswd = findViewById(R.id.Password);
        btnLogin = findViewById(R.id.Connexion);
        res = findViewById(R.id.result);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (TextUtils.isEmpty(login.getText().toString()) || TextUtils.isEmpty(pswd.getText().toString())) {
                    Toast.makeText(LoginActivity.this, "Login / Password Required", Toast.LENGTH_LONG).show();
                } else {
                    login();
                }
            }
        });
    }
        public void login() {
            LoginRequest  loginRequest = new LoginRequest();
            loginRequest.setLogin(login.getText().toString());
            loginRequest.setPassword(pswd.getText().toString());

            Call<LoginResponse> loginResponseCall = ApiClient.getJsonPlaceHolderApi().userLogin(loginRequest);

            loginResponseCall.enqueue(new Callback<LoginResponse>() {
                @Override
                public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {

                    if(response.isSuccessful()) {
                        Toast.makeText(LoginActivity.this, "Login Successful", Toast.LENGTH_LONG).show();
                    } else {
                        Toast.makeText(LoginActivity.this, "Login failed", Toast.LENGTH_LONG).show();
                    }
                }

                @Override
                public void onFailure(Call<LoginResponse> call, Throwable t) {
                    Toast.makeText(LoginActivity.this, t.getLocalizedMessage(), Toast.LENGTH_LONG).show();
                    res.setText(t.getLocalizedMessage());
                }
            });
        }



}