package com.example.betmaster.web.dto;

public class EditProfileDto {

    private String firstName;

    private String lastName;

    private String profilePicture;

    private String email;


    public String getFirstName() {
        return firstName;
    }

    public EditProfileDto setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public EditProfileDto setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public EditProfileDto setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public EditProfileDto setEmail(String email) {
        this.email = email;
        return this;
    }
}
