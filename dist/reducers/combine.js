export function mergeAndRemoveDuplicates(first, second) {
    const compound = [...first, ...second].map((draw) => JSON.stringify(draw));
    const actualizedHistory = compound.filter((el, pos) => {
        return compound.indexOf(el) === pos;
    });
    return actualizedHistory.map((draw) => JSON.parse(draw));
}
