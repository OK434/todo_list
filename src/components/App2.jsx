import NullSelect from "./nullSelect";
import ProjectsSidebar from "./ProjectsSidebar";
import NewProject from "./NewProject";
import SelectPro from "./SelectedPro";
import { useState } from "react";

export default function App2() {
  const [selectPro, setSelectPro] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });
  function handleAddTask(text) {
    setSelectPro((prevState) => {
      const taskId = Math.random().toString();
      const newtask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newtask],
      };
    });
  }
  function handleDelTask(id) {
    setSelectPro((prevState) => ({
      ...prevState,

      tasks: selectPro.tasks.filter((task) => task.id !== id),
    }));
  }
  function handleSelectId(id) {
    setSelectPro((prevState) => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }
  function handleStartAddPro() {
    setSelectPro((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleAddProject(projectData) {
    setSelectPro((prevState) => {
      const projectId = Math.random().toString();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: projectId,
        projects: [...prevState.projects, newProject],
      };
    });
  }
  function handelCancelAdd() {
    setSelectPro((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }
  function deleteTask() {
    setSelectPro((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: selectPro.projects.filter(
        (project) => project.id !== selectPro.selectedProjectId
      ),
    }));
  }
  const selectedProject = selectPro.projects.find(
    (project) => project.id === selectPro.selectedProjectId
  );
  let content = (
    <SelectPro
      project={selectedProject}
      onDelete={deleteTask}
      onAddTask={handleAddTask}
      onDelTask={handleDelTask}
      tasks={selectPro.tasks}
    />
  );
  if (selectPro.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handelCancelAdd} />
    );
  } else if (selectPro.selectedProjectId === undefined) {
    content = <NullSelect onStartAddPro={handleStartAddPro} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddPro={handleStartAddPro}
        projects={selectPro.projects}
        onSelectProject={handleSelectId}
        selectProjectId={selectPro.selectedProjectId}
      />
      {content}
    </main>
  );
}
