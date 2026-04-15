import { useState, useCallback, memo } from "react";
import useProjects from "../hooks/useProjects"; // ✅ NOUVEAU

// ANCIEN
// import { useEffect } from "react";
// import api from "../api/axios";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "./Dashboard.module.css";

// XSS TEST (ancien)
const dangerousName = '<img src=x onerror=alert("HACK")>';

// ANCIEN TYPE
interface Project {
  id: string;
  name: string;
  color: string;
}

// NOUVEAU Redux (optionnel ici si besoin plus tard)
// import { useSelector, useDispatch } from "react-redux";

// ✅ AJOUT : Memoized Sidebar
const MemoizedSidebar = memo(Sidebar);

export default function Dashboard() {
  // ANCIEN
  // const [projects, setProjects] = useState<Project[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // ✅ NOUVEAU : tout vient du hook
  const {
    projects,
    columns,
    loading,
    error,
    addProject,
    renameProject,
    deleteProject,
  } = useProjects();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false); // ✅ NOUVEAU

  // ANCIEN
  /*
  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);
  */

  // ANCIEN
  /*
  async function addProject(name: string, color: string) {
    const { data } = await api.post("/projects", { name, color });
    setProjects((prev) => [...prev, data]);
  }
  */

  // ANCIEN
  /*
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
  */

  // ✅ useCallback reste utile
  const handleRename = useCallback((project: Project) => {
    renameProject(project);
  }, [renameProject]);

  // ANCIEN
  /*
  async function deleteProject(id: string) {
    if (!confirm("Delete project?")) return;

    await api.delete("/projects/" + id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }
  */

  return (
    <>
      {/* XSS TEST (safe render) */}
      <p>{dangerousName}</p>

      {/* DANGEROUS (disabled) */}
      {/*
      <div dangerouslySetInnerHTML={{ __html: dangerousName }} />
      */}

      <div>
        <Header
          title="TaskFlow"
          onMenuClick={() => setSidebarOpen((p) => !p)}
          userName={"User"}
        />

        {/* ❌ ANCIEN */}
        {/* <Sidebar projects={projects} isOpen={sidebarOpen} /> */}

        {/* ✅ NOUVEAU */}
        <MemoizedSidebar
          projects={projects}
          isOpen={sidebarOpen}
          onRename={handleRename}
        />

        {/* ✅ Exemple avec columns (comme demandé) */}
        <div>
          {projects.map((p) => (
            <div key={p.id}>
              {p.name}
              <button onClick={() => renameProject(p)}>Rename</button>
              <button onClick={() => deleteProject(p.id)}>Delete</button>
            </div>
          ))}
        </div>

        {/* ⚠️ Tu peux plus tard utiliser */}
        {/* <MainContent columns={columns} /> */}
      </div>
    </>
  );
}