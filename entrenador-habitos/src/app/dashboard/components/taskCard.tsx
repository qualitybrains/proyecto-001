import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TrashIcon } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import React from 'react'

interface TaskCardProps {
    taskId: number,
    title: string,
    description: string | undefined,
    status?: number,
    points: number
}

function TaskCard({taskId, title, description, status, points}: TaskCardProps) {
  const router = useRouter()
  const handleDelete = async (taskId: number) => {
    const response = await fetch(`/api/tasks`, { 
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId }),
    })
    response.ok &&
    // Here is where I would like to revalidate the page / reload tasks
    router.refresh()
  }
  return (
    <>
        <Card className="flex flex-col h-[300px] w-[300px] items-center">
            <CardHeader className='flex-row w-full'>
              <CardTitle>{title}</CardTitle>
              <Button className="h-8 w-8 flex flex-col justify-end ml-2 hover:text-red-600" variant={"outline"} 
              onClick={() => handleDelete(taskId)}>
              <TrashIcon />
              </Button>
            </CardHeader>
            <CardContent>
                <label>{description}</label>
            </CardContent>
            <CardFooter>
              <h1 className="text-3xl font-bold">{points} pts.</h1>
            </CardFooter>
        </Card>
    </>
  )
}

export default TaskCard