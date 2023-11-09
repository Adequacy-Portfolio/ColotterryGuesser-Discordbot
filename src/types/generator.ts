export namespace MathematicalConceptsN {
  export type digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  export type number_ = `${digit}`;
  export type order = [number_, number_, number_];
  export type positions = Record<1 | 2 | 3, order>;
  export type sequence = [number_, number_];
  export type pattern = [number_, number_, number_];
  export type draw = `${digit}${digit}${digit}`;
  export type seq = `${digit}${digit}`;
}
