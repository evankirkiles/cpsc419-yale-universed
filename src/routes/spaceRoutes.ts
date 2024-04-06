import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Route handler for creating a new space
router.post('/api/space', async (req: Request, res: Response) => {
  try {
    const { name, description, userId } = req.body;

    const newSpace = await prisma.space.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(201).json(newSpace);
  } catch (error) {
    console.error('Error creating space:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
