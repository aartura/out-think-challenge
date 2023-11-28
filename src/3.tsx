type ConvertFunction<T> = T extends (...args: any[]) => any ? (...args: any[]) => string : never;

type ConvertedObject<T> = {
    [K in keyof T as `${K & string}JSON`]: ConvertFunction<T[K]>;
};

function convertReturnedValuesToJSON<T>(funcs: T): ConvertedObject<T> {
    const converted: Partial<ConvertedObject<T>> = {};

    for (const key in funcs) {
        if (Object.prototype.hasOwnProperty.call(funcs, key)) {
            const originalFunc = funcs[key] as (...args: any[]) => any;
            // @ts-ignore
            converted[`${key}JSON` as keyof ConvertedObject<T>] = (...args: any[]) => {
                const result = originalFunc(...args);
                return JSON.stringify(result);
            };
        }
    }

    return converted as unknown as ConvertedObject<T>;
}

// Example usage:
const funcs = {
    repeat(val: string, times: number): string[] {
        const arr: string[] = [];
        for (let i = 0; i < times; ++i) {
            arr.push(val);
        }
        return arr;
    },
    wrap(value: number): { value: number } {
        return { value };
    },
};

export const converted = convertReturnedValuesToJSON(funcs);

// The type of 'converted' is:
// {
//   repeatJSON: (val: string, times: number) => string;
//   wrapJSON: (value: number) => string;
// }
