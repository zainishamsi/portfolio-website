import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Project from './models/Project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
if (!fs.existsSync('uploads')){
    fs.mkdirSync('uploads');
}

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/portfolio')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const { title, description, tags, liveUrl, githubUrl } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    
    const newProject = new Project({
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim()),
      imageUrl,
      liveUrl,
      githubUrl
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/projects/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, tags, liveUrl, githubUrl } = req.body;
    const updateData = {
      title,
      description,
      tags: typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags,
      liveUrl,
      githubUrl
    };
    
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));