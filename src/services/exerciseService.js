import { create, getAll, getById, update, remove} from '../repositories/exerciseRepo.js';

export async function getAllExercises(options) {
  return getAll(options);
}

export async function getExerciseById(id) {
  const exercise = await getById(id);
  if (exercise) return exercise;
  else {
    const error = new Error(`Exercise ${id} not found`);
    error.status = 404;
    throw error;
  }
};

export async function createExercise(data) {
  return create(data);
};

export async function updateExercise(id, data){
  const updatedExercise = await update(id, data);
  if (updatedExercise) return updatedExercise;
  else {
    const error = new Error(`Exercise ${id} not found`);
    error.status = 404;
    throw error;
  }
};

export async function deleteExercise(id){
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Exercise ${id} not found`);
    error.status = 404;
    throw error;
  }
};