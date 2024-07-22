import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TrashIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';

interface TaskCardProps {
  taskId: number,
  title: string;
  description: string | undefined;
  status?: number;
  points: number;
}

function TaskCard({ taskId, title, description, status, points }: TaskCardProps) {
  const { toast } = useToast()
  const handleDelete = async () => {

    const response = await fetch(`/api/tasks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId }),
    });

    if (!response.ok) {
      toast({
        description: 'Error al eliminar la tarea',
        variant: 'destructive',
      })
      return
    }

    toast({
      description: 'Tarea eliminada',
      variant: 'default',
    })
  }
  return (
    <>
      <Card className="flex w-[300px] flex-col items-center">
        <CardHeader>
          <Button onClick={handleDelete} className='size-12 self-end hover:text-red-600' variant="ghost"><TrashIcon /></Button>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <label>{description}</label>
        </CardContent>
        <CardFooter>
          <h1 className="text-3xl font-bold">{points} pts.</h1>
        </CardFooter>
      </Card>
    </>
  );
}

export default TaskCard;
