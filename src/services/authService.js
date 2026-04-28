import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {createUser,findUserByUsername} from '../repositories/userRepo.js';

export async function signUp(username,password){
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({username, password: hashedPassword});
    return newUser;
}

export async function logIn(username, password){
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    const error = new Error('Invalid credentials');
    error.status = 401;
    const user = await findUserByUsername(username);
    if(!user)throw error;

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw error;

    const accessToken = jwt.sign({id: user.id, role: user.role}, JWT_SECRET,{expiresIn: JWT_EXPIRES_IN,});

    return accessToken;
}