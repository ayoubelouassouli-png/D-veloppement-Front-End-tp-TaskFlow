import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenue sur TaskFlow</h1>
      <p>Gestion de projets collaboratifs</p>
      <a href="/login">Se connecter</a>
    </div>
  );
}