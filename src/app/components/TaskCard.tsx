import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { clientRevalidatePath } from '@/lib/clientRevalidatePath';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface TaskCardProps {
  taskId: number;
  title: string;
  description: string | undefined;
  status?: number;
  points: number;
}

function TaskCard({ taskId, title, description, status, points }: TaskCardProps) {
  const { toast } = useToast();
  const router = useRouter();
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
      });
      return;
    }
    // TODO Find another way to revalidate the data
    clientRevalidatePath('/');
    toast({
      description: 'Tarea eliminada',
      variant: 'default',
    });
  };
  return (
    <>
      <Card className="flex w-[300px] flex-col items-center">
        <CardHeader>
          <Button onClick={handleDelete} className="size-12 self-end hover:text-red-600" variant="ghost">
            <TrashIcon />
          </Button>
          <CardTitle className='overflow-hidden'><div className="w-[200px] overflow-hidden">{title}</div></CardTitle>
        </CardHeader>
        <CardContent className='overflow-hidden'>
          <div className="h-12 w-[200px] text-sm">
            {description}
          </div>
        </CardContent>
        <CardFooter>
          <h1 className="text-3xl font-bold">{points} pts.</h1>
        </CardFooter>
      </Card>
    </>
  );
}

export default TaskCard;
