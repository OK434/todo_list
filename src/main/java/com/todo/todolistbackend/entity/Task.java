package com.todo.todolistbackend.entity;

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

    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "fk_project_id")
    private Project project;

}
