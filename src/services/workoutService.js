import { create, getAll, getById, update, remove} from '../repositories/workoutRepo.js';

export async function getAllWorkouts(options) {
  return getAll(options);
}

export async function getWorkoutById(id) {
  const workout = await getById(id);
  if (workout) return workout;
  else {
    const error = new Error(`Workout ${id} not found`);
    error.status = 404;
    throw error;
  }
};

export async function createWorkout(data) {
  return create(data);
};

export async function updateWorkout(id, data){
  const updatedWorkout = await update(id, data);
  if (updatedWorkout) return updatedWorkout;
  else {
    const error = new Error(`Workout ${id} not found`);
    error.status = 404;
    throw error;
  }
};

export async function deleteWorkout(id){
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Workout ${id} not found`);
    error.status = 404;
    throw error;
  }
};