import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE "users", "Workout", "Exercise", "Log", "WorkoutExercise" RESTART IDENTITY CASCADE;`;

  const exercisesData = [
    { name: 'Bench Press', muscleGroup: 'Chest', description: 'Lay on bench, push weight up.' },
    { name: 'Squats', muscleGroup: 'Legs', description: 'Barbell on back, squat down.' },
    { name: 'Pullups', muscleGroup: 'Back', description: 'Pull body up to the bar.' },
  ];

  const exercises = [];
  for (const ex of exercisesData) {
    const exercise = await prisma.exercise.create({ data: ex });
    exercises.push(exercise);
  }

  const usersData = [
    { username: 'swolebro', password: 'swole123' },
    { username: 'admin_joe', password: 'admin123', role: 'ADMIN' },
  ];

  const users = [];
  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });

    users.push(user);
  }

  await prisma.workout.createMany({
    data: [
      { id: 1, name: 'Heavy Leg Day', description: 'Squat focus', userId: 1 },
      { id: 2, name: 'Push Hypertrophy', description: 'Chest focus', userId: 2 },
    ],
  });

  await prisma.workoutExercise.createMany({
    data: [
      { workoutId: 1, exerciseId: 1, sets: 3, reps: 10 },
      { workoutId: 1, exerciseId: 2, sets: 4, reps: 8 },
      { workoutId: 2, exerciseId: 1, sets: 5, reps: 5 },
    ],
  });

  await prisma.log.createMany({
    data: [
      { userId: 1, workoutId: 1 },
      { userId: 2, workoutId: 2 },
    ],
  });

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}