import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to serve the song file
  app.get('/api/song', (req, res) => {
    try {
      // Path to the song file
      const songPath = path.resolve(process.cwd(), 'attached_assets/@Talwiinder Khayaal NDS Official Music Video Viral Song (mp3cut.net).mp3');
      
      // Check if file exists
      if (fs.existsSync(songPath)) {
        // Set appropriate headers
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'inline; filename="khayaal.mp3"');
        
        // Stream the file to the client
        const stream = fs.createReadStream(songPath);
        stream.pipe(res);
      } else {
        res.status(404).json({ message: 'Song file not found' });
      }
    } catch (error) {
      console.error('Error serving song file:', error);
      res.status(500).json({ message: 'Error serving the song file' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
