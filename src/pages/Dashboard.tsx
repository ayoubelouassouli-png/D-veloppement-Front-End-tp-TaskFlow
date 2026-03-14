import { useState, useEffect } from "react";
import { useAuth } from "../features/auth/AuthContext";
import api from "../api/axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "./Dashboard.module.css";

interface Project {
  id: string;
  name: string;
  color: string;
}

export default function Dashboard() {
  const { state: authState, dispatch } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  async function addProject(name: string, color: string) {
    const { data } = await api.post("/projects", { name, color });
    setProjects((prev) => [...prev, data]);
  }

  async function renameProject(project: Project) {
    const newName = prompt("Nouveau nom :", project.name);

    if (!newName) return;

    const { data } = await api.put("/projects/" + project.id, {
      ...project,
      name: newName,
    });

    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? data : p))
    );
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete project?")) return;

    await api.delete("/projects/" + id);

    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <Header
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen((p) => !p)}
        userName={authState.user?.name}
        onLogout={() => dispatch({ type: "LOGOUT" })}
      />

      <Sidebar projects={projects} isOpen={sidebarOpen} />

      <div>
        {projects.map((p) => (
          <div key={p.id}>
            {p.name}

            <button onClick={() => renameProject(p)}>Rename</button>

            <button onClick={() => deleteProject(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}