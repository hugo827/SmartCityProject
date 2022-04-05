package com.example.readedmanga.Models;

public class SignUpRequest {

    private String login, password, email;
    private String birthdate, phone, picture;
    private final static Boolean is_admin = false;

    public SignUpRequest(String login, String password, String email, String birthdate, String phone, String picture) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.birthdate = birthdate;
        this.phone = phone;
        this.picture = picture;
    }

    public SignUpRequest(String login, String password, String email) {
        this(login, password, email, null, null, null);
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
