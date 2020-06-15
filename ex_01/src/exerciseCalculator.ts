


interface exerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


const parseArguments = (min_args: number, max_args: number, args: Array<string>): Array<number> => {
    const pargs = args.slice(2)

    if ((pargs.length > max_args) || (pargs.length < min_args))
        throw new Error('Invalid parameter count:' + pargs.length);


    const ret = pargs.map((x) => Number(x))
    console.log(ret)
    const all_fine = ret.reduce((v, l) => (isNaN(l) ? 0 : v * 1), 1)

    if (all_fine) {
        return ret
    } else {
        throw new Error('Provided values were not numbers!');
    }
}




const exerciseCalculator = (target: number, hours: Array<number>): exerciseResult => {


    const average = hours.reduce((v, l) => (v + l), 0) / hours.length
    const periodLength = hours.length
    const trainingDays = hours.reduce((v, l) => (l > 0 ? v + 1 : v), 0)



    let rating = 1

    if (average >= target)
        rating = 3

    else if (average * 1.25 >= target)
        rating = 2;


    const RATE_TABLE = ["Uh no", "Pretty fine", "Great result!"]
    const ratingDescription = RATE_TABLE[rating - 1]
    const success = rating >= 3;


    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}



try {
    const params = parseArguments(1, 999, process.argv );
    console.log("Params:", params)
    const res = exerciseCalculator( params[0], params.slice(1) )
    console.log("RES", res)

} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}


