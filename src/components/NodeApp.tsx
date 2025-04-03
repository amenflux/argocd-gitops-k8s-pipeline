
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from './CodeBlock';

const NodeApp = () => {
  const nodeAppCode = `// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Item Schema
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Node.js Microservice is running' });
});

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new item
app.post('/api/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(\`Server listening on port \${port}\`);
});`;

  const dockerfileCode = `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]`;

  const packageJsonCode = `{
  "name": "node-mongo-microservice",
  "version": "1.0.0",
  "description": "A simple Node.js microservice with MongoDB",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0"
  },
  "devDependencies": {
    "jest": "^29.6.4",
    "nodemon": "^3.0.1"
  }
}`;

  return (
    <div className="w-full">
      <Card className="border-2 border-nodejs shadow-lg">
        <CardHeader className="bg-nodejs bg-opacity-10">
          <CardTitle className="text-nodejs">Node.js Microservice</CardTitle>
          <CardDescription>Simple Express API with MongoDB integration</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="app">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="app">app.js</TabsTrigger>
              <TabsTrigger value="dockerfile">Dockerfile</TabsTrigger>
              <TabsTrigger value="package">package.json</TabsTrigger>
            </TabsList>
            <TabsContent value="app">
              <CodeBlock 
                title="app.js" 
                code={nodeAppCode} 
                language="javascript" 
              />
            </TabsContent>
            <TabsContent value="dockerfile">
              <CodeBlock 
                title="Dockerfile" 
                code={dockerfileCode} 
                language="dockerfile" 
              />
            </TabsContent>
            <TabsContent value="package">
              <CodeBlock 
                title="package.json" 
                code={packageJsonCode} 
                language="json" 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NodeApp;
