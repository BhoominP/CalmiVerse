import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const getTasks = () => {
  if (typeof window === "undefined") return [];
  const tasksJson = localStorage.getItem("tasks");
  return tasksJson ? JSON.parse(tasksJson) : [];
};

const getPoints = () => {
  if (typeof window === "undefined") return 0;
  const pointsStr = localStorage.getItem("gamificationPoints");
  return pointsStr ? parseInt(pointsStr, 10) : 0;
};

export default function PointsTasks() {
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setTasks(getTasks());
    setPoints(getPoints());

    const handleStorageChange = () => {
      setTasks(getTasks());
      setPoints(getPoints());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleTaskToggle = (taskId) => {
    let currentTasks = getTasks();
    const updatedTasks = currentTasks.map((task) => {
      if (task.id === taskId && !task.completed) {
        const newPoints = getPoints() + task.points;
        localStorage.setItem("gamificationPoints", newPoints.toString());
        setPoints(newPoints); // ✅ update state immediately

        window.dispatchEvent(new Event("storage"));
        return { ...task, completed: true };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const uncompletedTasks = tasks.filter((task) => !task.completed);

  return (
    <ScrollArea className="h-40">
      <div className="space-y-2 pr-4">
        {uncompletedTasks.length > 0 ? (
          uncompletedTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex flex-col gap-1 rounded-md p-2 transition-colors",
                task.completed
                  ? "bg-green-100 dark:bg-green-900/30 text-muted-foreground line-through"
                  : "hover:bg-muted"
              )}
            >
              <div className="flex items-start gap-2">
                <Checkbox
                  id={`widget-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleTaskToggle(task.id)}
                  className="mt-1"
                  disabled={task.completed}
                />
                <div className="grid gap-0.5">
                  <label
                    htmlFor={`widget-${task.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {task.title}
                  </label>
                  {/* ✅ Inline description */}
                  {task.description && (
                    <p className="text-xs text-muted-foreground">
                      {task.description}
                    </p>
                  )}
                </div>
                <Badge
                  variant="secondary"
                  className="ml-auto self-center shrink-0"
                >
                  +{task.points}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground px-2">
            No new tasks right now. Try the AI First Aid if you need support.
          </p>
        )}
      </div>
    </ScrollArea>
  );
}
