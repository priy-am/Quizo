import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    await prisma.quiz.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Quiz deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return NextResponse.json({ error: "Failed to delete quiz" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}