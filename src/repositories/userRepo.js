import prisma from '../config/db.js';

export async function getAllUsers() {
  return prisma.user.findMany({
    select: { id: true, username: true, role: true },
  });
}

export async function createUser(data) {
  try {
    const newUser = await prisma.user.create({ data });
    const { password, ...safeUser } = newUser;
    return safeUser;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Username already used');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function findUserByUsername(username) {
  return prisma.user.findUnique({ where: { username } });
}

export async function findUserById(id) {
  const userId = parseInt(id, 10);
  if (isNaN(userId)) return null;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return null;

  const { password, ...safeUser } = user;
  return safeUser;
}

export async function updateUserById(id, data) {
  const userId = parseInt(id, 10);
  if (isNaN(userId)) return null;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });
    const { password, ...safeUser } = updatedUser;
    return safeUser;
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Username already used');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function deleteUserById(id) {
  const userId = parseInt(id, 10);
  if (isNaN(userId)) return null;

  return prisma.user.delete({ where: { id: userId } });
}

export async function findPostsByUserId(userId) {
  const uid = parseInt(userId, 10);
  if (isNaN(uid)) return [];

  return prisma.post.findMany({ where: { authorId: uid } });
}

export async function updateUserRoleById(id, role) {
  const userId = parseInt(id, 10);
  if (isNaN(userId)) return null;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  const { password, ...safeUser } = updatedUser;
  return safeUser;
}