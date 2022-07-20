import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from './prisma'

export const validateRoute = (handler) => {
    return async(req: NextApiRequest, res: NextApiResponse) => {
        const token = req.cookies.TRAX_ACCESS_TOKEN;
        let user;
        if (!token) {
            return res.status(401).json({ error: 'Not logged in' });
        }
        try {
            const { id } = jwt.verify(token, 'secret');
            user = await prisma.user.findUnique({
                where: {
                    id,
                },
            });
            if(!user) {
                return res.status(401).json({ error: 'Not logged in' });
            }
        } catch (e) {
            return res.status(401).json({ error: 'Not logged in' });
        }
        return handler(req, res, user);
    }
}

export const validateToken = (token) => {
    const user = jwt.verify(token, 'secret')
    return user
  }