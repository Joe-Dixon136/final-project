import bcrypt from 'bcrypt';
import {
  getAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
  findPostsByUserId,
  findUserByUsername,
  updateUserRoleById,
} from '../repositories/userRepo.js';

export async function getAllUsersHandler(req, res) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });

    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error in getAllUsersHandler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getMeHandler(req, res) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const userId = parseInt(req.user.id, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Error in getMeHandler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getUserByUsernameHandler(req, res) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const username = parseInt(req.user.id, 10);
    if (isNaN(username)) return res.status(400).json({ error: 'Invalid username' });

    const user = await findUserByUsername(username);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Error in getMeHandler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getUserByIdHandler(req, res) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const userId = parseInt(req.user.id, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Error in getMeHandler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateMeHandler(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = parseInt(req.user.id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const allowedFields = ['email', 'password'];
    const filteredData = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        filteredData[key] = updateData[key];
      }
    }

    const updated = await updateUserById(userId, filteredData);
    return res.status(201).json(updated);

  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Email already used' });
    }

    if (err.status === 409) {
      return res.status(409).json({ error: err.message });
    }

    console.error('Error in updateMeHandler:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteMeHandler(req, res) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const userId = parseInt(req.user.id, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await deleteUserById(userId);
    res.status(204).send();
  } catch (err) {
    console.error('Error in deleteMeHandler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getMyPostsHandler(req, res) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    const userId = parseInt(req.user.id, 10);
    if (isNaN(userId)) return res.status(400).json({ error: 'Invalid user ID' });

    const posts = await findPostsByUserId(userId);
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error in getMyPostsHandler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateUserRoleHandler(req, res) {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });

    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid user ID' });

    const user = await findUserById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { role } = req.body;
    if (!role) return res.status(400).json({ error: 'Role is required' });
    if (!['USER', 'ADMIN'].includes(role)) return res.status(400).json({ error: 'Invalid role' });

    const updated = await updateUserRoleById(id, role);
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error in updateUserRoleHandler:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}