/* tslint:disable */
/* eslint-disable */
/**
* @param {string} json1
* @param {string} json2
* @param {string} varname
* @param {number} nentries
* @returns {string}
*/
export function parse_json_add(json1: string, json2: string, varname: string, nentries: number): string;
/**
* @param {string} json1
* @param {string} json2
* @param {string} varname
* @param {number} nentries
* @returns {string}
*/
export function parse_json_mult(json1: string, json2: string, varname: string, nentries: number): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly add_two: (a: number, b: number) => number;
  readonly mult_two: (a: number, b: number, c: number, d: number) => number;
  readonly get_result_len: () => number;
  readonly parse_json_add: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly parse_json_mult: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
