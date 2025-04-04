import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { headValue, dinosaur, customTextInput } = req.body;

        try {
            const jsonDirectory = path.join(process.cwd(), 'data');
            const fileContents = await fs.readFile(path.join(jsonDirectory, 'pairs.json'), 'utf8');
            const pairs = JSON.parse(fileContents);

            const updatedPairs = pairs.filter(pair => pair.headValue !== headValue);
            updatedPairs.push({ headValue, dinosaur, customTextInput });

            await fs.writeFile(path.join(jsonDirectory, 'pairs.json'), JSON.stringify(updatedPairs, null, 2));
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error updating pairs:', error);
            res.status(500).json({ error: 'Failed to update pairs' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}