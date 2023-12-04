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
pub fn parse_json(json1: &str, _json2: &str, _varname: &str, nentries: usize) -> String {
    const VARNAME: &str = "bike_index";
    const VEC_IS_ERR: Vec<f64> = Vec::new();

    let mut values: Vec<f64> = Vec::new();
    match serde_json::from_str::<Vec<Value>>(json1) {
        Ok(rows) => {

            for row in rows {
                if let Value::Object(obj) = row {
                    if let Some(Value::Number(num)) = obj.get(VARNAME) {
                        if let Some(val) = num.as_f64() {
                            if values.len() < nentries {
                                values.push(val);
                            }
                        }
                    }
                }
            }

        }
        Err(_e) => {
            let _ = Vec::<f64>::new();
        }
    }

    serde_json::to_string(&values).unwrap()
}
