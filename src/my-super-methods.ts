export function double(x: number) {
  return x + x;
}

export function triple(x: number) {
  return x + x + x;
}

export function multiply(...args: number[]) {
  return args.reduce((prev, curr) => prev * curr, 1);
}

export function sum(...args: number[]) {
  return args.reduce((prev, curr) => prev + curr, 0);
}

export function reverse<Type>(value: Type[]): Type[];
export function reverse(value: string): string;
export function reverse<Type>(value: string | Type[]): string | Type[] {
  const isStringType = isString(value);
  const transformed = isStringType ? value.split('') : value;
  transformed.reverse();
  return isStringType ? (transformed as string[]).join('') : (transformed as Type[]);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function plot<Type>(value: Type): void;
export function plot<Type>(array: Type[]): void;
export function plot(...args: any[]): void;
export function plot(...args: any[]) {
  if (args.length === 0) {
    console.log('');
    return;
  }
  console.log(JSON.stringify(args.length === 1 ? args[0] : args.join(' ')));
}
