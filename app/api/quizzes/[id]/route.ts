import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // Extract ID from the request params

        if (!id) {
            return NextResponse.json({ error: "Quiz ID is required" }, { status: 400 });
        }

        const quiz = await prisma.quiz.findUnique({
            where: { id },
        });

        if (!quiz) {
            return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
        }

        // Delete the quiz from the database
        await prisma.quiz.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Quiz deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        return NextResponse.json({ error: "Failed to delete quiz" }, { status: 500 });
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const quiz = await prisma.quiz.findUnique({
        where: { id: params.id },
      });
  
      if (!quiz) {
        return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
      }
  
      return NextResponse.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
    }
  }