import prisma from '../config/db.js';

export async function create(logData) {
  const newLog = await prisma.log.create({ data: logData });
  return newLog;
}

export async function getAll({ sortBy, order, offset, limit }) {
  const logs = await prisma.log.findMany({
    orderBy: { [sortBy]: order },
    take: limit,
    skip: offset,
  });
  return logs;
}

export async function getById(id) {
  const log = await prisma.log.findUnique({ where: { id } });
  return log;
}

export async function update(id, updatedData) {
  try {
    const updatedLog = await prisma.log.update({
      where: { id },
      data: updatedData,
    });
    return updatedLog;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedLog = await prisma.log.delete({
      where: { id },
    });
    return deletedLog;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}