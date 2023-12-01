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

pub fn parse_json_old(data1: &str, data2: &str) -> Result<(), JsValue> {
    let _v1: Value = serde_json::from_str(data1)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;
    let _v2: Value = serde_json::from_str(data2)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    // TODO: Process v1 and v2

    Ok(())
}

#[wasm_bindgen]
pub fn parse_json(json: &str) -> String {
    const VARNAME: &str = "bike_index";

    match serde_json::from_str::<Vec<Value>>(json) {
        Ok(rows) => {
            let mut values: Vec<f64> = Vec::new();

            for row in rows {
                if let Value::Object(obj) = row {
                    if let Some(Value::Number(num)) = obj.get(VARNAME) {
                        if let Some(val) = num.as_f64() {
                            values.push(val);
                        } else {
                            return format!("Error: Value for '{}' is not a valid f64", VARNAME);
                        }
                    } else {
                        return format!("Error: Column '{}' not found", VARNAME);
                    }
                } else {
                    return "Error: JSON structure is not an array of objects".to_string();
                }
            }

            serde_json::to_string(&values).unwrap_or_else(|e| format!("Error: {}", e.to_string()))
        }
        Err(e) => {
            format!("Error: {}", e.to_string())
        }
    }
}
