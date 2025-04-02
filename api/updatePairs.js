import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { pairs } = req.body;

        try {
            const jsonDirectory = path.join(process.cwd(), 'data');
            await fs.writeFile(jsonDirectory + '/pairs.json', JSON.stringify(pairs, null, 2));
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error updating pairs:', error);
            res.status(500).json({ error: 'Failed to update pairs' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}