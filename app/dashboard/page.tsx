// app/dashboard/page.tsx
import { prisma } from '@/lib/prisma';
import AddProjectForm from './AddProjectForm';
import { deleteProject } from '../actions/projects';
export default async function DashboardPage() {
 const projects = await prisma.project.findMany({
 orderBy: { createdAt: 'desc' }
 });
 return (
 <div style={{ padding: '2rem' }}>
 <h1>Dashboard</h1>
 <p>{projects.length} projets</p>
 <AddProjectForm />
 <ul>
 {projects.map(p => (
 <li key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center',
marginBottom: 8 }}>
 <span style={{ width: 12, height: 12, borderRadius: '50%', background: p.color,
display: 'inline-block' }} />
 <a href={`/projects/${p.id}`}>{p.name}</a>
 <form action={deleteProject} style={{ display: 'inline' }}>
 <input type="hidden" name="id" value={p.id} />
 <button type="submit">🗑</button>
 </form>
 </li>
 ))}
 </ul>
 </div>
 );
}

// import AddProjectForm from './AddProjectForm';
// export default async function DashboardPage() {
//  const res = await fetch('http://localhost:4000/projects', { cache: 'no-store' });
//  const projects = await res.json();
//  return (
//  <div style={{ padding: '2rem' }}>
//  <h1>Dashboard</h1>
//  <AddProjectForm />
//  <ul>
//  {projects.map((p: any) => (
//  <li key={p.id}>{p.name}</li>
//  ))}
//  </ul>
//  </div>
//  );
// }

// // // app/dashboard/page.tsx
// // interface Project {
// //   id: string;
// //   name: string;
// //   color: string;
// // }
// // export default async function DashboardPage() {
// //   const res = await fetch('http://localhost:4000/projects', {
// //     cache: 'no-store' // SSR : toujours frais
// //   });
// //   const projects: Project[] = await res.json();
// //   return (
// //     <div style={{ padding: '2rem' }}>
// //       <h1>Dashboard</h1>
// //       <p>{projects.length} projets</p>
// //       <ul>
// //         {projects.map(p => (
// //           <li key={p.id} style={{ marginBottom: 8 }}>
// //             <span style={{
// //               display: 'inline-block', width: 12, height: 12,
// //               borderRadius: '50%', background: p.color, marginRight: 8
// //             }} />
// //             <a href={`/projects/${p.id}`}>{p.name}</a>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }