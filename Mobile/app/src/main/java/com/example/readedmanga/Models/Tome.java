package com.example.readedmanga.Models;

public class Tome {

    private int id_tome;
    private int number;
    private String title;
    private Boolean notOut;
    private String release_date;
    private Boolean isReaded;

    public int getId_tome() {
        return id_tome;
    }

    public void setId_tome(int id_tome) {
        this.id_tome = id_tome;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getNotOut() {
        return notOut;
    }

    public void setNotOut(Boolean notOut) {
        this.notOut = notOut;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public Boolean getReaded() {
        return isReaded;
    }

    public void setReaded(Boolean readed) {
        isReaded = readed;
    }
}
