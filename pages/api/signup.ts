import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => { 
    const salt = bcrypt.genSaltSync();
    const { email, password } = req.body;

    let user: User;

    try {
        user = await prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password, salt)
            }
        });
    } catch (e) {    
        res.status(401)
        res.json({ error: 'Email already exists' })
        return
    }

    const token = jwt.sign({ id: user.id, email: user.email, time: Date.now(), }, 'secret', { expiresIn: '8h' });
    
    res.setHeader('Set-Cookie', cookie.serialize('TRAX_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60 * 1000,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    }));
}