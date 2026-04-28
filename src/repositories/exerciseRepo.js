import prisma from '../config/db.js';

export async function create(exerciseData) {
  const newExercise = await prisma.exercise.create({ data: exerciseData });
  return newExercise;
}

export async function getAll({ search, sortBy, order, offset, limit }) {
  const conditions = {};
  if (search) {
    conditions.name = { contains: search, mode: 'insensitive' } 
  }
  const exercises = await prisma.exercise.findMany({
    where: conditions,
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return exercises;
}

export async function getById(id) {
  const exercise = await prisma.exercise.findUnique({ where: { id } });
  return exercise;
}

export async function update(id, updatedData) {
  try {
    const updatedExercise = await prisma.exercise.update({
      where: { id },
      data: updatedData,
    });
    return updatedExercise;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedExercise = await prisma.exercise.delete({
      where: { id },
    });
    return deletedExercise;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}