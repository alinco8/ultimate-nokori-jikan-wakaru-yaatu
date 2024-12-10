use merge_types::merge_types_from_dir;

fn main() {
    merge_types_from_dir("./types", false).unwrap();
}
