package com.todo.todolistbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long taskId;

    private String description;

    @ManyToOne
    @JoinColumn(name = "fk_project_id")
    @JsonIgnore
    private Project project;

}
