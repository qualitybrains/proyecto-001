"use client"
import TaskCard from "./dashboard/components/taskCard";
import AddTaskModal from "./dashboard/components/addTaskModal";
import { useState } from "react";
import TopNavBar from "@/components/ui/top-navbar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TasksCarousel from "./dashboard/components/tasksCarousel";

export default function Home() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  return (
    <main className="flex min-h-screen max-w-full flex-col items-start px-4">
      <TopNavBar />
      <section className="flex flex-row gap-4 align-middle mt-6 px-10">
        <h1 className="text-4xl font-bold">Tareas</h1>
        <div>
          <AddTaskModal open={showAddTaskForm} onOpenChange={setShowAddTaskForm} />
        </div>
      </section>
      <div className="flex flex-row mt-10 px-14">
        <TasksCarousel />
      </div>
    </main>
  );
}
