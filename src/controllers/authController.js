import {signUp, logIn} from '../services/authService.js';

export async function signUpHandler(req,res){
    const {username,password} = req.body;
    const newUser = await signUp(username, password);
    res.status(201).json(newUser);
}

export async function logInHandler(req, res) {
  const { username, password } = req.body;

  try {
    const accessToken = await logIn(username, password);

    if (!accessToken) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);

    if (err.message === 'Invalid credentials') {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(500).json({ message: 'Server error' });
  }
}