export interface Cloneable {
    clone(): this;
}
export interface Operation<Able = never> {
    add(b: this | number | Able): this;
    sub(b: this | number | Able): this;
    mul(b: this | number | Able): this;
    div(b: this | number | Able): this;
}
