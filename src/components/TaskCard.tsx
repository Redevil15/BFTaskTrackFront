import { EditIcon, TrashIcon } from 'lucide-react';
import React from 'react';

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  dueDate: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  onEdit,
  dueDate,
  onDelete,
}) => {
  return (
    <div className="border rounded-md shadow-md bg-blue-900 text-white p-4 relative">
      {/* Título */}
      <h2 className="text-xl font-bold mb-2">{title}</h2>

      {/* Descripción */}
      <p className="text-sm text-gray-300 mb-4">{description}</p>

      <p className="text-sm">
        <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
      </p>

      {/* Estado y Acciones */}
      <div className="flex items-center justify-between">
        {/* Estado */}
        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            status === 'completed' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>

        {/* Acciones */}
        <div className="flex space-x-2">
          {/* Editar */}
          <button
            onClick={onEdit}
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md"
          >
            <EditIcon />
          </button>
          {/* Eliminar */}
          <button
            onClick={onDelete}
            className="bg-red-700 hover:bg-red-600 text-white p-2 rounded-md"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
