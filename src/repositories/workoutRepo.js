import prisma from '../config/db.js';

export async function create(workoutData) {
  return prisma.workout.create({
  data: {
      name: workoutData.name,
      description: workoutData.description,
      userId: workoutData.userId,
      exercises: {
        create: workoutData.exercises 
      }
    },
    include: {
      exercises: true
    }
  });
}

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};
  if (search) {
    conditions.name  = { contains: search, mode: 'insensitive' } 
  }
  const workouts = await prisma.workout.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
    include: { exercises: true }
  });
  return workouts;
}

export async function getById(id) {
  const workout = await prisma.workout.findUnique({ where: { id } });
  return workout;
}

export async function update(id, updatedData) {
  try {
    const updatedWorkout = await prisma.workout.update({
      where: { id },
      data: updatedData,
    });
    return updatedWorkout;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedWorkout = await prisma.workout.delete({
      where: { id },
    });
    return deletedWorkout;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}