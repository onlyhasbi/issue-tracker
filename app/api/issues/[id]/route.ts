import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/authOptions';

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
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );
  }

  const { title, description, status, assignedToUserId } = body;

  if (assignedToUserId) {
    const user = prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'assigned to user not found' },
        { status: 400 }
      );
    }
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: 'issue not found' }, { status: 404 });

  const updateIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: { title, description, status, assignedToUserId },
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
