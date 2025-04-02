import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    try {
        const jsonDirectory = path.join(process.cwd(), 'data');
        const fileContents = await fs.readFile(jsonDirectory + '/pairs.json', 'utf8');
        res.status(200).json(JSON.parse(fileContents));
    } catch (error) {
        console.error('Error reading pairs:', error);
        res.status(500).json({ error: 'Failed to read pairs' });
    }
}