export function byPositionReportDataForm(data) {
    const sorted_stats = Object.entries(data).map((element) => {
        const [position, stat] = element;
        return [
            ...Object.entries(stat)
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
    const report_data = {
        1: sorted_stats[0].map(([num, prob]) => num),
        2: sorted_stats[1].map(([num, prob]) => num),
        3: sorted_stats[2].map(([num, prob]) => num),
    };
    return report_data;
}
export function bySequenceReportDataForm(data) {
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
    const report_data = sorted_stats.map(([seq, prob]) => seq);
    return report_data;
}
export function byPatternReportDataForm(data) {
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
    const report_data = sorted_stats.map(([pat, prob]) => pat.split(""));
    return report_data;
}
