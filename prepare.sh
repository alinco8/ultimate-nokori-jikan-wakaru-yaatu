npm version $1 --no-git-tag-version
(cd src-tauri && cargo bump $1)

bun tauri build --target aarch64-apple-darwin
