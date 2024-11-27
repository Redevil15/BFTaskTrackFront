import React, { useEffect, useState } from 'react';
import { SignedIn, UserButton, useUser } from '@clerk/clerk-react';
import {
  createTask,
  deleteTask,
  getTasksByUserId,
  updateTask,
} from '../api/taskService';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { toast } from 'sonner';

interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(9); // Por defecto 9 para pantallas grandes

  useEffect(() => {
    const fetchTasks = async () => {
      if (user?.id) {
        try {
          const data = await getTasksByUserId(user.id);
          setTasks(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message || 'Failed to fetch tasks');
          } else {
            setError('Failed to fetch tasks');
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTasks();
  }, [user?.id]);

  // Ajustar dinámicamente el número de tareas por página según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTasksPerPage(3); // Cargar solo 3 tareas en móviles
      } else {
        setTasksPerPage(9); // Cargar 9 tareas en pantallas más grandes
      }
    };

    handleResize(); // Llamar al inicio
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (taskId: string | undefined) => {
    if (!taskId) return;

    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error(
        `Error: ${
          error instanceof Error ? error.message : 'Failed to delete task.'
        }`
      );
    }
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleCreate = () => {
    setCurrentTask(null);
    setModalOpen(true);
  };

  const handleSubmit = async (task: Task) => {
    try {
      if (currentTask && currentTask._id) {
        const updatedTask = await updateTask(currentTask._id, task);
        setTasks((prev) =>
          prev.map((t) => (t._id === currentTask._id ? updatedTask : t))
        );
        toast.success('Task updated successfully!');
      } else {
        if (!user?.id) return;
        const newTask = await createTask({ ...task, userId: user.id });
        setTasks((prev) => [...prev, newTask]);
        toast.success('Task created successfully!');
      }
      setModalOpen(false);
    } catch (error) {
      toast.error(
        `Error: ${
          error instanceof Error ? error.message : 'Failed to process task.'
        }`
      );
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-100 p-4 overflow-y-auto">
      <header className="absolute top-4 right-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main className="mt-8">
        <h1 className="text-4xl font-bold mb-4">
          {user?.firstName?.toLocaleUpperCase()
            ? `${user.firstName}'s Tasks Board`
            : 'Tasks Board'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentTasks.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              dueDate={task.dueDate}
              onEdit={() => handleEdit(task)}
              onDelete={() => handleDelete(task._id)}
            />
          ))}

          <div
            onClick={handleCreate}
            className="border rounded-md shadow-md bg-blue-900 text-white p-4 flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="text-5xl">+</div>
            <p className="text-sm mt-2">Create Task</p>
          </div>
        </div>
      </main>
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={currentTask}
      />
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
