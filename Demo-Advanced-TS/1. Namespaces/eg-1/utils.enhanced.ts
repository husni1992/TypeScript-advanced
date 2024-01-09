export namespace DateUtils {
  export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  export function parseDate(input: string): Date | null {
    const parsedDate = new Date(input);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  export function isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }
}

export namespace StringUtils {
  export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  export function trim(str: string): string {
    return str.trim();
  }

  export function splitWords(str: string): string[] {
    return str.split(/\s+/);
  }
}

export namespace ArrayUtils {
  export function unique<T>(array: T[]): T[] {
    return Array.from(new Set(array));
  }

  export function flatten<T>(array: T[][]): T[] {
    return ([] as T[]).concat(...array);
  }

  export function last<T>(array: T[]): T | undefined {
    return array.length > 0 ? array[array.length - 1] : undefined;
  }
}

export namespace MathUtils {
  export function sum(numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }

  export function average(numbers: number[]): number | null {
    if (numbers.length === 0) return null;
    return sum(numbers) / numbers.length;
  }

  export function max(numbers: number[]): number | null {
    if (numbers.length === 0) return null;
    return Math.max(...numbers);
  }
}
