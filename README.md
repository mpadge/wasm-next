# nextjs and WebAssembly

This is a modified version of the nextjs example at
https://github.com/vercel/next.js/tree/canary/examples/with-webassembly. That
repository illustrates a finished example. This one simply details the steps
needed to integrate WebAssembly within an existing nextjs project. This project
uses the directory root, `/`.

Both this repository and the demonstration one from Vercel use pre-compiled
wasm binaries that are added to a commit and uploaded directly to GitHub and
therefore Vercel. It is also possible to use the community-supported [rust
runtime](https://github.com/vercel-community/rust). The general procedure is:

1. Define your rust function. The one used here is in a [`/src`
   directory](https://github.com/mpadge/wasm-next/tree/main/src):

    ``` rust
    #[no_mangle]
    pub extern "C" fn add_two(x: i32, y:i32) -> i32 {
        x + y
    }
    ```
    where the "no_mangle" tells the compiler to keep the function name so it
    can be called in JavaScript, and the `extern "C"` tells the compiler to use
    the C Applicaiton Binary Interface (ABI), so the compiled binary can be
    called from JavaScript.
2. Add a line to the "scripts" of `package.json` to build the wasm binary:
   ```
   "build-rust": "rustc --target wasm32-unknown-unknown -O --crate-type=cdylib src/add.rs -o wasm/add.wasm"
   ```
   That builds the binary `add.wasm` in a `wasm` sub-directory. Building
   directly in the project root will generally not work, and any changes to
   sub-directory name must also be mapped in
   [`next.config.js`](https://github.com/mpadge/wasm-next/blob/main/next.config.js#L8-L9).
   Running the "build-rust" script on the server requires the [rust runtime](https://github.com/vercel-community/rust), whereas directly committing the compiled binary avoids this requirement.
3. Add a typescript rust component, like [`components/RustComponent2.tsx`
   here](https://github.com/mpadge/wasm-next/blob/main/components/RustComponent2.tsx).
   That component imports an interface defined here in
   [`wasm.d.ts`](https://github.com/mpadge/wasm-next/blob/main/wasm.d.ts)
   called 'AddModuleExports'. The wasm binary compiled to `wasm/add.wasm` in
   the previous step is imported in the component on [Line
   12](https://github.com/mpadge/wasm-next/blob/main/components/RustComponent2.tsx#L12).
4. In the target page where the rust function is to be called, import the
   component defined in the previous step, and then simply add that component.
   That page in this case is
   [`pages/index.tsx`](https://github.com/mpadge/wasm-next/blob/main/pages/index.tsx).

## Adding additional rust functions

Each additional function can be defined within the same `src/add.rs` file (or
elsewhere), but should be exported within separate components. Those exports
can then be imported on whatever page or component they'll be used, and called
directly from there.

### Adding crates

Entire crates can also be bundled and compiled to WebAssembly. Compilation then
requires the [wasm-pack](https://github.com/rustwasm/wasm-pack) tool, which can
be called from `npm` by adding the following line (as a "script") to
`package.json`:
```
"build-crate": "cd src && wasm-pack build --target web --out-dir ../wasm",
```
The final `--out-dir` flag specifies the directory where the wasm binary will
be created. Generation of WASM binaries also requires modifying `Cargo.toml`
files by adding the following lines:
```
[lib]
crate-type = ["cdylib"]
```
or possibly:
```
[lib]
crate-type = ["cdylib", "rlib"]
```
