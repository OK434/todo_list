
import SelectPro from "./SelectedPro";
import { useState } from "react";
import Calendar from "./Calendar";

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

  function handleStartAddPro() {
    setSelectPro((prevState) => ({
      ...prevState,
      selectedProjectId: null,
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


  return (
    <main className="h-screen my-8 flex gap-8">
      {<Calendar onStartAddPro={handleStartAddPro} />}
    </main>
  );
}
