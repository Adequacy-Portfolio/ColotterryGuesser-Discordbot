//@ts-nocheck
export function byPositionReport(data) {
    const sorted_stats = Object.entries(data).map((element) => {
        const [position, stat] = element;
        return [
            position,
            Object.entries(stat)
                .sort((first, second) => {
                if (first[1] < second[1]) {
                    return +1;
                }
                else {
                    return -1;
                }
            })
                .slice(0, 3),
        ];
    });
    return `
  1st Number: ${sorted_stats[0][1]
        .map(([num, prob]) => `${num} (${prob}%)`)
        .join(" ")}
  2nd Number: ${sorted_stats[1][1]
        .map(([num, prob]) => `${num} (${prob}%)`)
        .join(" ")}
  3rd Number: ${sorted_stats[2][1]
        .map(([num, prob]) => `${num} (${prob}%)`)
        .join(" ")}
  `;
}
export function bySequenceReport(data) {
    const sorted_stats = Object.entries(data)
        .sort((first, second) => {
        if (first[1] < second[1]) {
            return +1;
        }
        else {
            return -1;
        }
    })
        .slice(0, 6);
    return `
\t${sorted_stats.map(([seq, prob]) => `${seq} (${prob}%)`).join("\n\t")}   
  `;
}
export function byPatternReport(data) {
    const sorted_stats = Object.entries(data)
        .sort((first, second) => {
        if (first[1] < second[1]) {
            return +1;
        }
        else {
            return -1;
        }
    })
        .slice(0, 6);
    return `
\t${sorted_stats.map(([pat, prob]) => `${pat} (${prob}%)`).join("\n\t")}   
  `;
}
export function last10DrawsReport(data) {
    return `
\t${data.map((draw, index) => index + 1 + " " + draw.join("")).join("\n\t")}
  `;
}
