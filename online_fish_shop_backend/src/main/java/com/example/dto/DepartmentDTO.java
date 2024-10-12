package com.example.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class DepartmentDTO {
    private Long id;
    private String name;
    private Set<Long> categoryIds;
}