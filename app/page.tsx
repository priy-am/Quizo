"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  PlusCircle, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Header from "@/components/ui/Header";

interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  const fetchQuizzes = async () => {
    try {
      const res = await fetch("/api/quizzes"); // Adjust API endpoint if needed
      if (!res.ok) throw new Error("Failed to fetch quizzes");

      const data = await res.json();
      console.log("API Response:", data);
      setQuizzes(data); // Update quizzes in state
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    const storedLogin = sessionStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
      fetchQuizzes();
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!isLoggedIn) {
    return null;
  }



  const handleDeleteQuiz = async (id: string) => {
    try {
      const res = await fetch(`/api/quizzes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete quiz");
      }

      // Update state to remove the deleted quiz from the UI without refreshing
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header title="Quizo" />

        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Quizzes</h2>

            <Button onClick={() => router.push("/quizzes/create")} >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>

          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">{quiz.title}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => router.push(`/quizzes/edit/${quiz.id}`)} >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Quiz</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this quiz? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteQuiz(quiz.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{quiz.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Created {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString("en-GB") : "N/A"}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center  flex items-center justify-center  text-2xl text-muted-foreground">No quizzes found.</p>
            )}
          </div>
        </main>
      </div>

    </>
  );
}
