package com.example.betmaster.web.dto;

import com.example.betmaster.user.model.User;

public class DtoMapper {

    public static EditProfileDto from(User user){
        return new EditProfileDto()
                .setFirstName(user.getFirstName())
                .setLastName(user.getLastName())
                .setProfilePicture(user.getProfilePicture())
                .setEmail(user.getEmail());


    }



}
