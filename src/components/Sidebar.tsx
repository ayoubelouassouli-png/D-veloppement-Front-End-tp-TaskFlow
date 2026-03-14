// v2 - fixed
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface Project { id: string; name: string; color: string; }

interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRename?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export default function Sidebar({ projects, isOpen, onRename, onDelete }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map(p => (
          <li key={p.id} className={styles.projectRow}>
            <span className={styles.dot} style={{ background: p.color }} />
            <NavLink
              to={`/projects/${p.id}`}
              className={({ isActive }) =>
                `${styles.projectName} ${isActive ? styles.active : ''}`
              }
              style={{ textDecoration: 'none', color: 'inherit', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {p.name}
            </NavLink>
            {(onRename || onDelete) && (
              <div className={styles.actions}>
                {onRename && (
                  <button
                    className={styles.actionBtn}
                    onClick={(e) => { e.preventDefault(); onRename(p); }}
                  >
                    Rename
                  </button>
                )}
                {onDelete && (
                  <button
                    className={`${styles.actionBtn} ${styles.actionBtnDelete}`}
                    onClick={(e) => { e.preventDefault(); onDelete(p.id); }}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
// import styles from './Sidebar.module.css';
// interface Project { id: string; name: string; color: string; }
// interface SidebarProps { projects: Project[]; isOpen: boolean; }
// export default function Sidebar({ projects, isOpen }: SidebarProps) {
//  return (
//  <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
//  <h2 className={styles.title}>Mes Projets</h2>
//  <ul className={styles.list}>
//  {projects.map(p => (
//  <li key={p.id} className={styles.item}>
//  <span className={styles.dot} style={{ background: p.color }} />
//  {p.name}
//  </li>
//  ))}
//  </ul>
//  </aside>
//  );
// }
