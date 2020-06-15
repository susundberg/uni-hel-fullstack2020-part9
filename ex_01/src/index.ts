
import express from 'express';
import { bmiCalculator } from './bmi';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/ping', (_req, res) => {
    res.send('Hello full stack');
});

app.get('/bmi', (req, res) => {

    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.status(400).json({ 'error': 'Invalid parameters' });
        return;
    }


    const bmi = bmiCalculator(height, weight);
    return res.json({ height, weight, bmi });
});

interface ExParams {
    target: number;
    daily_exercises: Array<number>;
}

function isExParams(param: ExParams) {

    if (typeof (param.target) != 'number')
        return false;

    if (Array.isArray(param.daily_exercises) != true)
        return false;

    for (const loop of param.daily_exercises) {
        if (typeof (loop) != 'number')
            return false;
    }

    return true;
}

app.post('/exercises', (req, res) => {

    const body = req.body ? req.body as ExParams : null;

    if (!body)
        return res.status(400).json({ 'error': 'parameters missing' });

    if (!isExParams(body))
        return res.status(400).json({ 'error': 'malformatted parameters' });


    // const daily_exercises = body.daily_exercises ? body.daily_exercises : null;
    // const target = body.target ? Number( body.target ) :

    // console.log("BODY", body );
    return res.json( exerciseCalculator( body.target, body.daily_exercises ) );

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});