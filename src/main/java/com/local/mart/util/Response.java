package com.local.mart.util;

import lombok.Data;

@Data
public class Response {

    public String message;

    public Response(String nameCannotBeEmpty) {
        this.message=nameCannotBeEmpty;
    }
    public Response(){}
}
