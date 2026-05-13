import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
// Pré-générer les pages au build
export async function generateStaticParams() {
 const projects = await prisma.project.findMany();
 return projects.map(p => ({ id: String(p.id) }));
}
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = await params;
 const project = await prisma.project.findUnique({
 where: { id: Number(id) }
 });
 if (!project) notFound();
 return (
 <div style={{ padding: '2rem' }}>
 <h1>
 <span style={{ display: 'inline-block', width: 16, height: 16,
 borderRadius: '50%', background: project.color, marginRight: 8 }} />
 {project.name}
 </h1>
 <p>Créé le : {project.createdAt.toLocaleDateString('fr-FR')}</p>
 <a href="/dashboard">← Retour</a>
 </div>
 );
}

// // app/projects/[id]/page.tsx
// interface Project { id: string; name: string; color: string; }
// interface Props {
//   params: Promise<{ id: string }>;
// }
// export default async function ProjectPage({ params }: Props) {
//   const { id } = await params;
//   const res = await fetch(`http://localhost:4000/projects/${id}`, {
//     cache: 'no-store'
//   });
//   if (!res.ok) {
//     return <div style={{ padding: '2rem' }}>Projet non trouvé</div>;
//   }
//   const project: Project = await res.json();
//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>
//         <span style={{
//           display: 'inline-block', width: 16, height: 16,
//           borderRadius: '50%', background: project.color, marginRight: 8
//         }} />
//         {project.name}
//       </h1>
//       <p>ID : {project.id}</p>
//       <a href="/dashboard">← Retour au Dashboard</a>
//     </div>
//   );
// }
// //Q1 — En React SPA, après un POST il fallait setProjects([...projects, newProject]) pour mettre à jour l'état local. 
// // Avec Next.js, revalidatePath('/dashboard') invalide le cache serveur et la page se rafraîchit automatiquement avec les nouvelles données.