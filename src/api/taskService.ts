import axiosInstance from './axiosIntance';

export interface Task {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

export const getTasksByUserId = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/tasks/userTasks`, {
      params: {
        userId, // userId será pasado como query param
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const updateTask = async (
  taskId: string,
  updateTaskDto: Partial<Task>
) => {
  try {
    const response = await axiosInstance.patch(
      `/tasks/${taskId}`,
      updateTaskDto
    );
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const createTask = async (
  task: Omit<Task, '_id'> & { userId: string }
) => {
  try {
    const response = await axiosInstance.post('/tasks/createTask', task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};
