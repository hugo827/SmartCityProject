package com.example.readedmanga.Views.Activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
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



    private Button btnDate;
    private Button btnSignUp;
    private EditText login;
    private EditText password;
    private EditText passwordVerif;
    private EditText phone;
    private EditText email;

    private SignUpViewModel signUpViewModel;

    private String date;


    int selectedYear = 2000;
    int selectedMonth = 5;
    int selectedDayOfMonth = 10;


    // Date Select Listener.
    DatePickerDialog.OnDateSetListener dateSetListener = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker datePicker, int year, int monthOfYear, int dayOfMonth) {

            monthOfYear +=1;
            String monthOfYearString = monthOfYear <= 9 ? ("0" + "" +monthOfYear) : "" + monthOfYear + "";
            String dayOfMonthString = dayOfMonth <= 9 ? ("0"+ "" +dayOfMonth) : "" + dayOfMonth + "";
            date = dayOfMonth + "/" + (monthOfYear + 1) + "/" + year;
            btnDate.setText(dayOfMonthString + "-" + monthOfYearString + "-" + year);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        setFindView();


        DatePickerDialog datePickerDialog = new DatePickerDialog(this, dateSetListener, selectedYear, selectedMonth, selectedDayOfMonth);


        signUpViewModel = new ViewModelProvider(this).get(SignUpViewModel.class);

        btnSignUp.setOnClickListener(view -> {
            if(TextUtils.isEmpty(login.getText().toString().trim()) ) {
                Toast.makeText(SignUpActivity.this, "Login is Required", Toast.LENGTH_LONG).show();
            } else {
                if(TextUtils.isEmpty(password.getText().toString().trim()) || TextUtils.isEmpty(passwordVerif.getText().toString().trim())){
                    Toast.makeText(SignUpActivity.this, "Password & Verification password is Required", Toast.LENGTH_LONG).show();
                } else {
                    if(password.getText().toString().trim().equals(passwordVerif.getText().toString().trim())) {
                        if(TextUtils.isEmpty(email.getText().toString().trim())) {
                            Toast.makeText(SignUpActivity.this, "Email is Required", Toast.LENGTH_LONG).show();
                        } else {

                            SignUpRequest signUpRequest = new SignUpRequest(
                                    login.getText().toString(), password.getText().toString(), email.getText().toString(),
                                    date, phone.getText().toString(), null

                            );
                            signUpViewModel.setSignUp(signUpRequest);
                        }
                    } else {
                        Toast.makeText(SignUpActivity.this, "Password & Verification password need to be equals", Toast.LENGTH_LONG).show();
                    }
                }

            }
        });

        btnDate.setOnClickListener(view ->  datePickerDialog.show());

        signUpViewModel.getSignUp().observe(this, msg -> {
            if(msg == null || msg.equals("failed")) {
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
        btnDate = findViewById(R.id.btnDate);
        btnSignUp = findViewById(R.id.btnSignUp);
        login = findViewById(R.id.editTextLogin);
        password = findViewById(R.id.editTextPassword);
        passwordVerif = findViewById(R.id.editTextPasswordVerif);
        phone = findViewById(R.id.editTextPhone);
        email = findViewById(R.id.editTextEmail);
    }

}