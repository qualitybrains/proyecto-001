"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SignUpForm from "./components/signUpForm";

export default function SignUp() {
    return (
      <main className="flex min-h-screen max-w-full flex-col items-center p-24">
          <section>
            <h1 className="text-5xl font-bold">Entrenador Hábitos - Quality Brains</h1>
          </section>
          <div className="mt-10">
          <Card className="flex flex-col w-[400px] items-center">
            Tarjeta vacía
          </Card>
          <SignUpForm hasBackButton={true}/>
          </div>
      </main>
    );
  }