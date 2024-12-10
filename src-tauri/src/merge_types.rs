use merge_types::merge_types_from_dir;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let path = "./bindings/";

    merge_types_from_dir(path, true)?;

    Ok(())
}
