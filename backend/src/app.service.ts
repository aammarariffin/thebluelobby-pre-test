import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './app.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(description: string): Promise<Task> {
    const task = new Task();
    task.description = description;
    return this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async updateTaskStatus(id: number, completed: boolean): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    task.completed = completed;
    return this.taskRepository.save(task);
  }
  

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async getFilteredTasks(completed: boolean): Promise<Task[]> {
    return this.taskRepository.find({ where: { completed } });
  }
}
