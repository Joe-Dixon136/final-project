import {getAllWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout} from '../services/workoutService.js';

export async function getAllWorkoutsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let workouts = await getAllWorkouts(options);
  res.status(200).json(workouts);
}

export async function getWorkoutByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const workout = await getWorkoutById(id);
  res.status(200).json(workout);
}

export async function createWorkoutHandler(req, res) {
  const { name, description, exercises } = req.body;
  const userId = req.user.id;
  const newWorkout = await createWorkout({ name, description, userId, exercises });
  res.status(201).json(newWorkout);
}

export async function updateWorkoutHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const updatedWorkout = await updateWorkout(id, { name, description });
  res.status(201).json(updatedWorkout);
}

export async function deleteWorkoutHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteWorkout(id);
  res.status(204).send();
}
