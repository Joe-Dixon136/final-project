import { create, getAll, getById, update, remove} from '../repositories/logRepo.js';

export async function getAllLogs(options) {
  return getAll(options);
}

export async function getLogById(id) {
  const log = await getById(id);
  if (log) return log;
  else {
    const error = new Error(`Log ${id} not found`);
    error.status = 404;
    throw error;
  }
};

export async function createLog(data) {
  return create(data);
};

export async function updateLog(id, data){
  const updatedLog = await update(id, data);
  if (updatedLog) return updatedLog;
  else {
    const error = new Error(`Log ${id} not found`);
    error.status = 404;
    throw error;
  }
};

export async function deleteLog(id){
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Log ${id} not found`);
    error.status = 404;
    throw error;
  }
};