export const range = (start, end, step = 1) => {
    let output = [];
    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    }
    for (let i = start; i < end; i += step) {
        output.push(i);
    }
    return output;
};

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export function dampen(val, [min, max]) {
    if (val > max) {
        let extra = val - max
        let dampenedExtra = extra > 0 ? Math.sqrt(extra) : -Math.sqrt(-extra)
        return max + dampenedExtra * 2
    } else if (val < min) {
        let extra = val - min
        let dampenedExtra = extra > 0 ? Math.sqrt(extra) : -Math.sqrt(-extra)
        return min + dampenedExtra * 2
    } else {
        return val
    }
}

export function decay(value, max) {
    if (max === 0) {
        return 0
    }
    let entry = value / max
    let sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5)

    return sigmoid * max
}