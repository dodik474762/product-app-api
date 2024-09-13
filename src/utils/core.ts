

const Core = {
    digitCount: (length : number, value: string): any => {
        while (value.length < length) 
            value = '0' + value;

        return value;
    },

    dateFormat : (date: Date): string => {
        const current_date = date;
        const month = (current_date.getMonth() + 1) < 10 ? '0' + (current_date.getMonth() + 1) : (current_date.getMonth() + 1);
        const day = (current_date.getDate()) < 10 ? '0' + (current_date.getDate()) : (current_date.getDate());
        const format_date = current_date.getFullYear() + '-' + (month) + '-' + day;

        return format_date;
    },

    getArrayChunks : <T>(array: T[], chunkSize: number): T[][] => {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    }
}

export default Core;