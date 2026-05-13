import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!project) {
    return NextResponse.json(
      { message: 'Projet introuvable' },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const updatedProject = await prisma.project.update({
    where: {
      id: Number(id)
    },
    data: {
      name: body.name,
      color: body.color
    }
  });

  return NextResponse.json(updatedProject);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.project.delete({
    where: {
      id: Number(id)
    }
  });

  return NextResponse.json({
    message: 'Projet supprimé'
  });
}