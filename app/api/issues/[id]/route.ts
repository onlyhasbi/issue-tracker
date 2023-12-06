import { getServerSession } from 'next-auth';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '@/app/validationSchema';
import { authOptions } from '../../auth/authOptions';

export async function PUT(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: {
      id: string;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: 'issue not found' }, { status: 404 });

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  const updateIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updateIssue);
}

export async function DELETE(
  request: NextRequest,
  {
    params: { id },
  }: {
    params: {
      id: string;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: 'issue not found' }, { status: 404 });

  await prisma.issue.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({});
}
