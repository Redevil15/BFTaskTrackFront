import React, { useEffect, useState } from 'react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  initialData?: Task | null; // Datos iniciales para la edición
}

interface Task {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [task, setTask] = useState<Task>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium', // Valor predeterminado
    status: 'pending', // Valor predeterminado
  });

  // Sincroniza el estado del formulario con initialData
  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    } else {
      setTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        status: 'pending',
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 w-96">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? 'Edit Task' : 'Create Task'}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded bg-transparent"
          />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded bg-transparent"
          />
          <div className="relative">
            {/* Contenedor visible interactivo */}
            <div
              className="absolute inset-0 cursor-pointer z-10"
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>('input[name="dueDate"]')
                  ?.click()
              }
            ></div>
            {/* Input */}
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-transparent text-gray-700 cursor-pointer relative z-20"
            />
            {/* Icono */}
            <svg
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M7 10h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
            </svg>
          </div>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-transparent"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {initialData ? 'Save' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
