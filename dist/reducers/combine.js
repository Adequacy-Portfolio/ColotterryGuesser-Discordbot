export function mergeAndRemoveDuplicates(first, second) {
    const compound = [...first, ...second];
    return clearDuplicates(compound);
}
export function clearDuplicates(list) {
    const stringified = list.map((el) => JSON.stringify(el));
    const cleared = stringified.filter((el, pos) => stringified.indexOf(el) === pos);
    return cleared.map((el) => JSON.parse(el));
}
