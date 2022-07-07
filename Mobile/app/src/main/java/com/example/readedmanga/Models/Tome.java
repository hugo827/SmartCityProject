package com.example.readedmanga.Models;

public class Tome {

    private int id_tome;
    private int number;
    private String title;
    private String picture;
    private String release_date;
    private Boolean is_last_tome;
    private int fk_manga;
    private int id_readed_tome;
    private String read_at;



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


    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Boolean getIs_last_tome() {
        return is_last_tome;
    }

    public void setIs_last_tome(Boolean is_last_tome) {
        this.is_last_tome = is_last_tome;
    }

    public int getFk_manga() {
        return fk_manga;
    }

    public void setFk_manga(int fk_manga) {
        this.fk_manga = fk_manga;
    }

    public int getId_readed_tome() {
        return id_readed_tome;
    }

    public void setId_readed_tome(int id_readed_tome) {
        this.id_readed_tome = id_readed_tome;
    }

    public String getRead_at() {
        return read_at;
    }

    public void setRead_at(String read_at) {
        this.read_at = read_at;
    }
}
