import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: 'v3' });
});

// Serve static files from root workspace (GET / serves index.html directly)
app.use(express.static(__dirname));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Visual Paint Tracker running on http://0.0.0.0:${PORT}`);
});
