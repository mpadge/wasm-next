use serde_json::Value;
use std::fs::File;
use std::io::BufReader;

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

/// Function to read file and return specified variable
#[no_mangle]
pub extern "C" fn read_file(
    filename_ptr: *const u8,
    filename_len: usize,
    varname_ptr: *const u8,
    varname_len: usize,
    nentries: usize
) -> *const f64 {
    let filename = unsafe { std::str::from_utf8(std::slice::from_raw_parts(filename_ptr, filename_len)).unwrap() };
    let varname = unsafe { std::str::from_utf8(std::slice::from_raw_parts(varname_ptr, varname_len)).unwrap() };
    assert!(nentries > 0, "nentries must be greater than zero");

    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);
    let json: Value = serde_json::from_reader(reader).unwrap();

    let mut result = Vec::with_capacity(nentries);
    let mut count = 0;

    if let Value::Array(array) = &json {
        for item in array {
            if let Value::Object(map) = item {
                if let Some(Value::Number(number)) = map.get(varname) {
                    if let Some(number) = number.as_f64() {
                        if count < nentries {
                            result.push(number);
                            count += 1;
                        }
                    }
                }
            }
        }
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
