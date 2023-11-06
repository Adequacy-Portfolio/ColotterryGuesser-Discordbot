export function getOutcomes(history) {
    return history.map(draw => {
        return draw.drawNumber;
    });
}
