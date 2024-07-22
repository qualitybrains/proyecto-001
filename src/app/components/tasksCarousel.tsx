'use client';

import { Task } from '@/app/types/task';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TaskCard from './taskCard';

interface Props {
  t: { task: Task | null }[];
}

function TasksCarousel({ t }: Props) {
  if (t.length === 0) return <h1 className="text-2xl">Aún no hay tareas. Agrega una para empezar</h1>;
  return (
    <Carousel>
      <CarouselContent>
        {t.map(({ task }) => {
          if (!task) return null;
          return (
            <CarouselItem key={task.id} className="basis-1/2">
              <TaskCard title={task.name} description={task.description as string} points={task.points} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default TasksCarousel;
