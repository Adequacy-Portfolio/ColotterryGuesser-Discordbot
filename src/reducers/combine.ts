export function mergeAndRemoveDuplicates<T extends object[]>(
  first: T,
  second: T,
) {
  const compound = [...first, ...second].map((draw) => JSON.stringify(draw));

  const actualizedHistory = compound.filter((el, pos) => {
    return compound.indexOf(el) === pos;
  });

  return actualizedHistory.map((draw) => JSON.parse(draw));
}
