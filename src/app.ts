import http from 'http';
import * as WebSocket from 'ws';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import * as redis from 'redis';
import express, { Request, Response } from 'express';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.json());


// Define the options for creating the Redis client
const redisClientOptions: any = {
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT || '6379'), // Default Redis port is 6379
    password: process.env.REDIS_PASSWORD as string,
};

// Create the Redis client with the defined options
const redisClient: any = redis.createClient(redisClientOptions);

const mongoURI = 'mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@test-cluster.6f94f5o.mongodb.net/';
const dbName = 'assignment';
const collectionName = 'assignment_saicharitha';

// WebSocket server
wss.on('connection', ws => {
    ws.on('message', data => {
        try {
            const { event, payload } = JSON.parse(data.toString());
            if (event === 'add') {
                redisClient.get('FULLSTACK_TASK_saicharitha', (err: any, reply: any) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    let tasks: any[] = [];
                    if (reply) {
                        tasks = JSON.parse(reply);
                    }
                    tasks.push(payload);
                    const tasksStr = JSON.stringify(tasks);
                    redisClient.set('FULLSTACK_TASK_saicharitha', tasksStr);
                    if (tasks.length > 50) {
                        moveTasksToMongo(tasks);
                        redisClient.del('FULLSTACK_TASK_saicharitha');
                    }
                });
            }
        } catch (error) {
            console.error('Error handling WebSocket message:', error);
        }
    });
});

// HTTP API endpoint for fetching notes
app.get('/fetchAllNotes', (req: Request, res: Response) => {
    redisClient.get('FULLSTACK_TASK_saicharitha', (err: any, reply: any) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const tasks = reply ? JSON.parse(reply) : [];
        res.json(tasks);
    });
});

// Endpoint to add a note
app.post('/addNote', (req: Request, res: Response) => {
    try {
        const { note } = req.body;
        if (!note) {
            return res.status(400).json({ error: 'Note is required' });
        }

        // Add the note to Redis
        redisClient.get('FULLSTACK_TASK_saicharitha', (err: any, reply: any) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            let tasks: any[] = reply ? JSON.parse(reply) : [];
            tasks.push(note);
            const tasksStr = JSON.stringify(tasks);
            redisClient.set('FULLSTACK_TASK_saicharitha', tasksStr);
            if (tasks.length > 50) {
                moveTasksToMongo(tasks);
                redisClient.del('FULLSTACK_TASK_saicharitha');
            }
            return res.status(201).json({ message: 'Note added successfully' });
        });
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to move tasks to MongoDB
async function moveTasksToMongo(tasks: any[]) {
    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertMany(tasks.map(task => ({ task })));
    } catch (error) {
        console.error('Error moving tasks to MongoDB:', error);
    } finally {
        await client.close();
    }
}


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
