const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

export function calculateBmi(weight: number, height: number): string {
    const underweight: number = 18.3;
    const overweight: number = 25;

    const bmi: number = weight / (height * 2);
    console.log(bmi);

    let bmiStatus: string = 'normal';
    let healthStatus: string = 'healthy';

    if (bmi <= underweight) {
        bmiStatus = 'Underweight';
        healthStatus = 'unhealthy';
    } else if (bmi >= overweight) {
        bmiStatus = 'Overweight';
        healthStatus = 'healthy';
    }

    return `${bmiStatus} (${healthStatus} weight)`;
}

const bmi = calculateBmi(height, weight);
console.log(bmi);
