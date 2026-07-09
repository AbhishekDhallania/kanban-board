"use client"

import { useState } from "react";

interface Task {
  key: string,
  title: string,
  project: string
}

export default function Home() {
  const initialTask: Task[] = [
    {
      key: "1",
      title: "Go to gym",
      project: "Health"
    },
    {
      key: "2",
      title: "take post workout meal",
      project: "Health"
    }
  ]

  const [drag, setDrag] = useState<null | Task>(null)
  const [task, setTask] = useState<Task[]>(initialTask)
  const [inProgress, setInProgress] = useState<Task[]>([])
  const [completed, setCompleted] = useState<Task[]>([])

  function handleDrop() {
    if(!drag){
      return 
    }
    const newTask = task.filter((task)=>(task.key != drag.key))
    setTask(newTask)
    setInProgress([...inProgress, drag])
    setDrag(null)
  }

  return (
    <div className="bg-blue-500 h-screen">
      <h1 className="p-4 text-center text-4xl">Kanban Board</h1>
      <div className="flex justify-between m-40">
        <div className="w-sm border rounded-sm h-80 bg-blue-200">
          {task.map((task) => (
            <div key={task.key}
              draggable="true"
              onDragStart={(e) => setDrag(task)}
              className="border rounded-sm p-4 bg-blue-300">
              <p>
                {task.title}
              </p>
              <p>
                {task.project}
              </p>
            </div>
          ))}
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault() }}
          className="w-sm border rounded-sm h-80 bg-amber-200">
          {inProgress.map((task) => (
            <div key={task.key}
              draggable="true"
              onDragStart={(e) => setDrag(task)}
              className="border rounded-sm p-4 bg-amber-400">
              {task.project}:{task.title}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
