import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Create Quiz
export async function POST(req: Request) {
    
    try {
        const { title, description } = await req.json(); 

        const teacherId = "priyam"; 
        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
        }

        const quiz = await prisma.quiz.create({
            data: { 
                title, 
                description, 
                teacherId,
                
            },
        });
        return NextResponse.json(quiz, { status: 201 });
    } catch (error) {
        console.error("Error creating quiz:", error);
        return NextResponse.json({ error: "Failed to create quiz" }, { status: 500 });
    }
    
}

// Get All Quizzes
export async function GET() {
    try {
        const quizzes = await prisma.quiz.findMany();
        return NextResponse.json(quizzes);
    } catch (error) {
        console.error("Error getting quizzes:", error);
        return NextResponse.json({ error: "Failed to get quizzes" }, { status: 500 });
    }
}
//update the quizzes
export async function PUT(req: Request) {
    try {
        const { id, title, description } = await req.json();
        const updatedQuiz = await prisma.quiz.update({
            where: { id: id }, 
            data: { title, description },
        });
        return NextResponse.json(updatedQuiz);
    } catch (error) {
        console.error("Error updating quiz:", error);
        return NextResponse.json({ error: "Failed to update quiz" }, { status: 500 });
    }
}

