import {getAllLogs, getLogById, createLog, updateLog, deleteLog} from '../services/logService.js';

export async function getAllLogsHandler(req, res) {
  const {
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let logs = await getAllLogs(options);
  res.status(200).json(logs);
}

export async function getLogByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const log = await getLogById(id);
  res.status(200).json(log);
}

export async function createLogHandler(req, res) {
  const { workoutId } = req.body;
  const userId = req.user.id;
  const newLog = await createLog({ userId, workoutId});
  res.status(201).json(newLog);
}

export async function updateLogHandler(req, res) {
  const id = parseInt(req.params.id);
  const { workoutId } = req.body;
  const updatedLog = await updateLog(id, { workoutId });
  res.status(201).json(updatedLog);
}

export async function deleteLogHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteLog(id);
  res.status(204).send();
}
