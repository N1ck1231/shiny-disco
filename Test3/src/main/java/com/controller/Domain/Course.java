package com.controller.Domain;

public class Course {
    private int id;
    private String name;
    private int hours;
    private int schools;
    private String Img;
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getSchools() {
        return schools;
    }

    public void setSchools(int schools) {
        this.schools = schools;
    }

    public String getImg() {
        return Img;
    }

    public void setImg(String img) {
        Img = img;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", hours=" + hours +
                ", schools=" + schools +
                '}';
    }
}


