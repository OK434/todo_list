package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM Project p JOIN FETCH p.tasks WHERE p.user = :user")
    List<Project> findByUserWithTasks(@Param("user") User user);
}
