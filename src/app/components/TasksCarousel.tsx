'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tasks } from '@prisma/client';
import TaskCard from './TaskCard';

interface Props {
  tasks: Tasks[];
}

function TasksCarousel({ tasks }: Props) {
  if (tasks.length === 0) return <h1 className="text-2xl">Aún no hay tareas. Agrega una para empezar</h1>;
  return (
    <Carousel className="w-full">
      <CarouselContent className="w-full gap-2">
        {tasks.map((task) => {
          if (!task) return null;
          return (
            <CarouselItem key={task.id} className="max-w-fit select-none">
              <TaskCard
                taskId={task.id}
                title={task.name}
                description={task.description as string}
                points={task.points}
              />
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
