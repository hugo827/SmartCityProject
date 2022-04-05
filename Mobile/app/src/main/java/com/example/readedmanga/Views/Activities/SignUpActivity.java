package com.example.readedmanga.Views.Activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;
import android.text.TextUtils;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.readedmanga.Models.SignUpRequest;
import com.example.readedmanga.R;
import com.example.readedmanga.ViewsModels.SignUpViewModel;


import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;


public class SignUpActivity extends AppCompatActivity {

    private List<String> days = new ArrayList<String>();
    private List<String> months = new ArrayList<String>();
    private List<String> years = new ArrayList<String>();
    private Spinner spinDay;
    private Spinner spinMonth;
    private Spinner spinYear;

    private Button btnSignUp;
    private EditText login;
    private EditText password;
    private EditText passwordVerif;
    private EditText phone;
    private EditText email;

    private SignUpViewModel signUpViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        setFindView();
        setDate();
        setSpinner();

        signUpViewModel = new ViewModelProvider(this).get(SignUpViewModel.class);

        btnSignUp.setOnClickListener(view -> {
            if(TextUtils.isEmpty(login.getText().toString().trim()) ) {
                Toast.makeText(SignUpActivity.this, "Login is Required", Toast.LENGTH_LONG).show();
            } else {
                if(TextUtils.isEmpty(password.getText().toString().trim()) || TextUtils.isEmpty(passwordVerif.getText().toString().trim())){
                    Toast.makeText(SignUpActivity.this, "Password & Verification password is Required", Toast.LENGTH_LONG).show();
                } else {
                    if(password.equals(passwordVerif)) {
                        if(TextUtils.isEmpty(email.getText().toString().trim())) {
                            Toast.makeText(SignUpActivity.this, "Email is Required", Toast.LENGTH_LONG).show();
                        } else {
                            SignUpRequest signUpRequest = new SignUpRequest(login.getText().toString(), password.getText().toString(), email.getText().toString());
                            signUpViewModel.setSignUp(signUpRequest);
                        }
                    } else {
                        Toast.makeText(SignUpActivity.this, "Password & Verification password need to be equals", Toast.LENGTH_LONG).show();
                    }
                }

            }
        });

        signUpViewModel.getSignUp().observe(this, msg -> {
            if(msg.equals("failed")) {
                Toast.makeText(SignUpActivity.this, "Failed to sign up", Toast.LENGTH_LONG).show();
            } else {
                onDestroy();
            }
        });

    }

    @Override
    public void onDestroy()
    {
        super.onDestroy();
        finish();
    }


    private void setFindView() {
        btnSignUp = findViewById(R.id.btnSignUp);
        login = findViewById(R.id.editTextLogin);
        password = findViewById(R.id.editTextPassword);
        passwordVerif = findViewById(R.id.editTextPasswordVerif);
        phone = findViewById(R.id.editTextPhone);
        email = findViewById(R.id.editTextEmail);
        spinDay = (Spinner) findViewById(R.id.spinnerDay);
        spinMonth = (Spinner) findViewById(R.id.spinnerMonth);
        spinYear = (Spinner) findViewById(R.id.spinnerYear);
    }

    private void setSpinner(){

        ArrayAdapter<String> adDays = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, days);
        ArrayAdapter<String> adMonths = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, months);
        ArrayAdapter<String> adYears = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_item, years);

        adDays.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        adMonths.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        adYears.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        spinDay.setAdapter(adDays);
        spinMonth.setAdapter(adMonths);
        spinYear.setAdapter(adYears);

    }

    private void setDate() {

        GregorianCalendar today = new GregorianCalendar();
        int year = today.get(Calendar.YEAR);

        for(int i = 0; i < 31; i++) {
            days.add((i+1)+"");
        }

        for(int i = 0; i < 12; i++) {
            months.add((i+1) + "");
        }

        for(int i = 0; 1980+i < year; i++) {
            years.add((1980+i) + "");
        }
    }
}