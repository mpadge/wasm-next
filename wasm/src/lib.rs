use wasm_bindgen::prelude::*;
use serde_json::Value;

#[no_mangle]
pub extern "C" fn add_two(x: i32, y:i32) -> i32 {
    x + y
}

static mut RESULT_LEN: usize = 0;

/// Function to multiply two vectors
#[no_mangle]
pub extern "C" fn mult_two(x: *const f64, len_x: usize, y: *const f64, len_y: usize) -> *const f64 {
    assert_eq!(len_x, len_y, "Vectors must be the same length");

    let x_slice = unsafe { std::slice::from_raw_parts(x, len_x) };
    let y_slice = unsafe { std::slice::from_raw_parts(y, len_y) };

    let mut result = Vec::with_capacity(len_x);
    for i in 0..len_x {
        result.push(x_slice[i] * y_slice[i]);
    }

    let ptr = result.as_mut_ptr();
    unsafe {
        RESULT_LEN = result.len();
    }
    std::mem::forget(result);

    ptr
}

#[no_mangle]
pub extern "C" fn get_result_len() -> usize {
    unsafe { RESULT_LEN }
}

#[wasm_bindgen]
// pub fn parse_json(data1: &str, data2: &str, varname: &str, nentries: usize) -> Result<(), JsValue> {
pub fn parse_json(data1: &str, data2: &str) -> Result<(), JsValue> {
    let _v1: Value = serde_json::from_str(data1)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    let _v2: Value = serde_json::from_str(data2)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    // TODO: Process v1 and v2

    Ok(())
}
