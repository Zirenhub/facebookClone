import { Request, Response } from 'express';

export async function login(req: Request, res: Response) {
  res.json({ status: 'success', data: null, message: null });
}

export async function signup(req: Request, res: Response) {
  res.json({ status: 'success', data: null, message: null });
}
