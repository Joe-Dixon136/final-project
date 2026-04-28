import {getAllExercises, getExerciseById, createExercise, updateExercise, deleteExercise} from '../services/exerciseService.js';

export async function getAllExercisesHandler(req, res) {
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
  let exercises = await getAllExercises(options);
  res.status(200).json(exercises);
}

export async function getExerciseByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const exercise = await getExerciseById(id);
  res.status(200).json(exercise);
}

export async function createExerciseHandler(req, res) {
  const { name, muscleGroup, description } = req.body;
  const newExercise = await createExercise({ name, muscleGroup, description });
  res.status(201).json(newExercise);
}

export async function updateExerciseHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, muscleGroup, description } = req.body;
  const updatedExercise = await updateExercise(id, { name, muscleGroup, description });
  res.status(201).json(updatedExercise);
}

export async function deleteExerciseHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteExercise(id);
  res.status(204).send();
}
