package com.example.readedmanga.Models;

public class ReadedManga {

    private int id_manga;
    private int id_followed_manga;
    private String title;

    public ReadedManga(int id_manga, int id_followed_manga, String title) {
        this.id_manga = id_manga;
        this.id_followed_manga = id_followed_manga;
        this.title = title;
    }

    public int getId_manga() {
        return id_manga;
    }

    public void setId_manga(int id_manga) {
        this.id_manga = id_manga;
    }

    public int getId_followed_manga() {
        return id_followed_manga;
    }

    public void setId_followed_manga(int id_followed_manga) {
        this.id_followed_manga = id_followed_manga;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
