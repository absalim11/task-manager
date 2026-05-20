<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Task::create([
            'title' => 'Learn Laravel 12',
            'description' => 'Understand the core concepts of Laravel 12.',
            'status' => 'done',
        ]);

        \App\Models\Task::create([
            'title' => 'Build a To-Do App',
            'description' => 'Create a full-stack to-do app with React and Laravel.',
            'status' => 'pending',
        ]);

        \App\Models\Task::create([
            'title' => 'Deploy with Docker',
            'description' => 'Containerize the application using Docker Compose.',
            'status' => 'pending',
        ]);
    }
}
