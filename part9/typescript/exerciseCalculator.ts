interface ResultObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface inputValues {
    target: number;
    traningHours: number[];
}

function calculateExercises(traningHours: number[], target: number): ResultObject {
    const periodLength = traningHours.length;

    const trainingDays = traningHours.filter((day) => day > 0).length;

    const average = traningHours.reduce((sum, curr) => sum + curr, 0) / traningHours.length;

    const success = average >= target;

    const rating = average < target ? 1 : average > target ? 3 : 2;

    const ratingDescription = getWorkoutReview(rating);

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
}

// const target: number = Number(process.argv[2]);
// let traningHours: number[] = [];

function parseArguments(args: string[]): inputValues {
    console.log(args.length);

    if (args.length < 10) throw new Error('Not enough arguments');
    if (args.length > 10) throw new Error('Too many arguments');

    let traningHours: number[] = [];

    for (let i = 3; i < process.argv.length; i++) {
        if (!isNaN(Number(process.argv[i]))) {
            traningHours = [...traningHours, Number(process.argv[i])];
        } else {
            throw new Error('Provided values was not all numbers');
        }
    }

    if (!isNaN(Number(args[2]))) {
        return {
            target: Number(args[2]),
            traningHours,
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

function getWorkoutReview(rating: number): string {
    switch (rating) {
        case 1:
            return 'Not too bad but could be better';
        case 2:
            return 'Right on target!';
        case 3:
            return 'Wow, better than expected';
        default:
            return 'No Rating';
    }
}

try {
    const { target, traningHours } = parseArguments(process.argv);

    const result = calculateExercises(traningHours, target);
    console.log(result);
} catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
