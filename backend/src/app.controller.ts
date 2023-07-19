import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { Task } from './app.entity';
import { TaskService } from './app.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body('description') description: string): Promise<Task> {
    return this.taskService.createTask(description);
  }

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Patch(':id')
  updateTaskStatus(
    @Param('id') id: number,
    @Body('completed') completed: boolean,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, completed);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Get('filtered')
  getFilteredTasks(@Query('completed') completed: boolean): Promise<Task[]> {
    return this.taskService.getFilteredTasks(completed);
  }
}
