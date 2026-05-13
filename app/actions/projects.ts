'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function addProject(formData: FormData) {
  const name = formData.get('name') as string;
  const color = formData.get('color') as string;

  await prisma.project.create({
    data: {
      name,
      color
    }
  });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = Number(formData.get('id'));
  const name = formData.get('name') as string;

  await prisma.project.update({
    where: {
      id
    },
    data: {
      name
    }
  });

  revalidatePath('/dashboard');
}

export async function deleteProject(formData: FormData) {
  const id = Number(formData.get('id'));

  await prisma.project.delete({
    where: {
      id
    }
  });

  revalidatePath('/dashboard');
}

// 'use server';
// import { revalidatePath } from 'next/cache';
// export async function addProject(formData: FormData) {
//  const name = formData.get('name') as string;
//  const color = formData.get('color') as string;
//  await fetch('http://localhost:4000/projects', {
//  method: 'POST',
//  headers: { 'Content-Type': 'application/json' },
//  body: JSON.stringify({ name, color }),
//  });
//  revalidatePath('/dashboard');
// }