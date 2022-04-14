package com.example.readedmanga.Models;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public class Manga {

    @SerializedName("id_manga")
    private int id;
    private String title;
    private String synopsis;
    private double new_price;
    private String type;
    private String sub_genre;
    private String author;
    private String publisher;
    private String picture;
    private boolean is_finish;
    private List<Tome> tomeList;
    private Boolean isFollowed;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public double getNew_price() {
        return new_price;
    }

    public void setNew_price(double new_price) {
        this.new_price = new_price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSub_genre() {
        return sub_genre;
    }

    public void setSub_genre(String sub_genre) {
        this.sub_genre = sub_genre;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public boolean isIs_finish() {
        return is_finish;
    }

    public void setIs_finish(boolean is_finish) {
        this.is_finish = is_finish;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Tome> getTomeList() {
        return tomeList;
    }

    public void setTomeList(List<Tome> tomeList) {
        this.tomeList = tomeList;
    }

    public Boolean getFollowed() {
        return isFollowed;
    }

    public void setFollowed(Boolean followed) {
        isFollowed = followed;
    }
}
