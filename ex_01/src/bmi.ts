


const parseArguments = (args: Array<string>): Array<number> => {
    const pargs = args.slice( 2 )

    if (pargs.length != 2) throw new Error('Invalid parameter count:' + pargs.length );

    
    const ret = pargs.map((x) => Number(x))
    console.log(ret)
    const all_fine = ret.reduce((v, l) => (isNaN(l) ? 0 : v * 1), 1)

    if (all_fine) {
        return ret
    } else {
        throw new Error('Provided values were not numbers!');
    }
}


const calculateBmi = (heigh_cm: number, weight_kg: number) => {
    const heigh_m = heigh_cm / 100.0
    const bmi = weight_kg / (heigh_m * heigh_m)

    const BMI_TABLE = [
        ["Very severely underweight", 0, 15],
        ["Severely underweight", 15, 16],
        ["Underweight", 16, 18.5],
        ["Normal (healthy weight)", 18.5, 25],
        ["Overweight", 25, 30],
        ["Obese Class I (Moderately obese)", 30, 35],
        ["Obese Class II (Severely obese)", 35, 40],
        ["Obese Class III (Very severely obese)", 40, 999]]
    //console.log("BMI", bmi )
    for (const loop of BMI_TABLE) {
        if (bmi < loop[2])
            return loop[0]
        //console.log(loop)
    }
    //console.log("What the fuck!")
    return BMI_TABLE[ BMI_TABLE.length - 1][0]

}


try {
    const params = parseArguments(process.argv);
    console.log("Params:", params ) 
    console.log(calculateBmi(params[0], params[1]))

} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}
