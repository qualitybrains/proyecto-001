'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TopNavBar from '@/components/ui/top-navbar';
import { useState } from 'react';
import AddTaskModal from './dashboard/components/addTaskModal';
import TaskCard from './dashboard/components/taskCard';
import TasksCarousel from './dashboard/components/tasksCarousel';

export default function Home() {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  return (
    <main className="flex min-h-screen max-w-full flex-col items-start px-4">
      <TopNavBar />
      <section className="mt-6 flex flex-row gap-4 px-10 align-middle">
        <h1 className="text-4xl font-bold">Tareas</h1>
        <div>
          <AddTaskModal open={showAddTaskForm} onOpenChange={setShowAddTaskForm} />
        </div>
      </section>
      <div className="mt-10 flex flex-row px-14">
        <TasksCarousel />
      </div>
    </main>
  );
}
