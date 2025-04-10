export function percentDiff(a, b) {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export function capitilize(s) {
    return s.charAt(0).toUpperCase() + s.substr(1)
}