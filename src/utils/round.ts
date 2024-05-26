export const round100 = (n: number) => Math.round(n * 100) / 100;
export const round = (n: number) => Math.round(n);

export const complement = (n: number) => {
    if ((n * 100) % 100 === 0) {
        return `${n}.00`;
    }
    if ((n * 100) % 10 === 0) {
        return `${n}0`;
    }
    return n;
};
