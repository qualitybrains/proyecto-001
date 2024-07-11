import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

interface TaskCardProps {
    title: string,
    description: string,
    status: string,
    points: number
}

function TaskCard({title, description, status, points}: TaskCardProps) {
  return (
    <>
        <Card className="flex flex-col w-[300px] items-center">
            <CardHeader>
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
  )
}

export default TaskCard