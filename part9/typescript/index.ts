import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello');
});

//Get BMI
app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = calculateBmi(weight, height);

    res.json({ weight, height, bmi });
});

const port: number = 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
