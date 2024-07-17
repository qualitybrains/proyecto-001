import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React, { useEffect } from 'react'
import TaskCard from './taskCard'
import { Task, TaskArray } from '@/app/types/task'

function TasksCarousel() {
    const [allTasks, setAllTasks] = React.useState<TaskArray[]>([])
    const [loading, setLoading] = React.useState(true)
    useEffect(() => {
        fetch('/api/tasks')
          .then((res) => res.json())
          .then((data) => {
            setAllTasks(data)
            setLoading(false)
          })
      }, [])
    
    if (loading) return <p>Cargando...</p>
    if (allTasks?.length === 0) return <h1 className='text-2xl'>Aún no hay tareas. Agrega una para empezar</h1>
    return (
        <Carousel>
            <CarouselContent>
                {allTasks.map(t => 
                <CarouselItem key={t.task.id} className="basis-1/2">
                    <TaskCard title={t.task.name} description={t.task.description} points={t.task.points} />
                </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
        </Carousel>
  )
}

export default TasksCarousel