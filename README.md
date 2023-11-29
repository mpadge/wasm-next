# nextjs and WebAssembly

This is a modified version of the nextjs example at
https://github.com/vercel/next.js/tree/canary/examples/with-webassembly,
including WebAssembly module generated from a rust crate, instead of the simple
`.rs` file used in the Vercel example.

The crate is defined in [the `/wasm`
directory](https://github.com/mpadge/wasm-next/tree/main/wasm), and built with
the [npm script, `npm run
build-crate`](https://github.com/mpadge/wasm-next/blob/19f1678998e228c172d061b2c1fbbad701a65a96/package.json#L7).
This command compiles the WebAssembly binary module in the [`./pkg`
directory](https://github.com/mpadge/wasm-next/tree/main/pkg). (This location
must also be specified in
[`next.config.js`](https://github.com/mpadge/wasm-next/blob/main/next.config.js).)
All files in this directory, including the compiled binary, are then committed
with this repository, and the whole site built with `npm run build`. (Compiling
binaries on a server requires the community-supported [rust
runtime](https://github.com/vercel-community/rust).)

## WebAssembly interfaces from rust

The main rust function added here is [`mult_two` in
`wasm/src/lib.rs`](https://github.com/mpadge/wasm-next/blob/main/wasm/src/lib.rs).
This function demonstrates how to pass vectors between JavaScript and Rust: as
a pointer to the start of the vector in memory, and an integer defining the
length of the vector. The vectors may then be assembled in rust as on [lines
13-14](
`wasm/src/lib.rs`](https://github.com/mpadge/wasm-next/blob/main/wasm/src/lib.rs#L13-L14).

To return vectors from rust, they must first be converted to pointers as on
[line
21](https://github.com/mpadge/wasm-next/blob/main/wasm/src/lib.rs#L21), and the
vector itself then [removed from memory in
rust](https://github.com/mpadge/wasm-next/blob/main/wasm/src/lib.rs#L25).
Accessing the vectors from JavaScript requires both the pointer to the start of
the vector, and it's length. This length is recorded in the mutable global
variable defined at the [start of
`lib.rs`](https://github.com/mpadge/wasm-next/blob/main/wasm/src/lib.rs#L6).
The value of this variable may then be queries using the additionally exported
function,
[`get_result_len()`](https://github.com/mpadge/wasm-next/blob/main/wasm/src/lib.rs#L31-L33).

## Accessing WebAssembly from JavaScript

The function used to pass vectors from JavaScript to Rust is in
[`src/components/WasmVectorMult.tsx`](https://github.com/mpadge/wasm-next/blob/main/src/components/WasmVectorMult.tsx).
This file should be reasonably self-explanatory, but it is important to note
that the `allocateSpaceForVector` function is hard-coded for vectors of `f64`
values, and would need to be modified to allocate space for storing any other
kind of elements.
