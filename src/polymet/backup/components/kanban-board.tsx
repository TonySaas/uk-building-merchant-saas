import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, MoreHorizontalIcon, CalendarIcon, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskTag {
  id: string;
  label: string;
}

type Priority = "low" | "medium" | "high";

interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  assignee?: string;
  dueDate?: string;
  tags?: string[];
  columnId: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
  color?: string;
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onColumnsChange: (columns: KanbanColumn[]) => void;
  className?: string;
}

export default function KanbanBoard({
  columns,
  onColumnsChange,
  className,
}: KanbanBoardProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [newTask, setNewTask] = useState<Partial<KanbanTask>>({
    title: "",
    description: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    tags: [],
  });

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // If dropped in the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newColumns = [...columns];
    const sourceColumn = newColumns.find(col => col.id === source.droppableId);
    const destColumn = newColumns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Remove task from source column
    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

    // Update task's columnId
    movedTask.columnId = destination.droppableId;

    // Add task to destination column
    destColumn.tasks.splice(destination.index, 0, movedTask);

    onColumnsChange(newColumns);
  }, [columns, onColumnsChange]);

  const handleAddTask = () => {
    if (!newTask.title || !selectedColumn) return;

    const task: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority as Priority,
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      tags: newTask.tags || [],
      columnId: selectedColumn,
    };

    const newColumns = columns.map(column => {
      if (column.id === selectedColumn) {
        return {
          ...column,
          tasks: [...column.tasks, task],
        };
      }
      return column;
    });

    onColumnsChange(newColumns);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      assignee: "",
      dueDate: "",
      tags: [],
    });
    setIsAddingTask(false);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className={cn("h-full overflow-x-auto", className)}>
      <div className="flex gap-6 p-6 min-w-max">
        <DragDropContext onDragEnd={handleDragEnd}>
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {column.tasks.length}
                  </Badge>
                </div>
                <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedColumn(column.id)}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={newTask.title}
                          onChange={(e) =>
                            setNewTask({ ...newTask, title: e.target.value })
                          }
                          placeholder="Enter task title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newTask.description}
                          onChange={(e) =>
                            setNewTask({ ...newTask, description: e.target.value })
                          }
                          placeholder="Enter task description"
                        />
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={newTask.priority}
                          onValueChange={(value: Priority) =>
                            setNewTask({ ...newTask, priority: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="assignee">Assignee</Label>
                        <Input
                          id="assignee"
                          value={newTask.assignee}
                          onChange={(e) =>
                            setNewTask({ ...newTask, assignee: e.target.value })
                          }
                          placeholder="Enter assignee"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={newTask.dueDate}
                          onChange={(e) =>
                            setNewTask({ ...newTask, dueDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddTask} className="flex-1">
                          Add Task
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddingTask(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "space-y-3 min-h-[200px] transition-colors",
                      snapshot.isDraggingOver && "bg-blue-50"
                    )}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              "cursor-grab transition-shadow",
                              snapshot.isDragging && "shadow-lg rotate-1"
                            )}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between">
                                <CardTitle className="text-sm font-medium">
                                  {task.title}
                                </CardTitle>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              {task.description && (
                                <p className="text-sm text-gray-600 mb-3">
                                  {task.description}
                                </p>
                              )}
                              <div className="flex items-center justify-between">
                                <Badge
                                  className={cn(
                                    "text-xs",
                                    getPriorityColor(task.priority)
                                  )}
                                >
                                  {task.priority}
                                </Badge>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  {task.assignee && (
                                    <div className="flex items-center gap-1">
                                      <UserIcon className="h-3 w-3" />
                                      {task.assignee}
                                    </div>
                                  )}
                                  {task.dueDate && (
                                    <div className="flex items-center gap-1">
                                      <CalendarIcon className="h-3 w-3" />
                                      {task.dueDate}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
