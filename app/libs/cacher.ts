export type CachedData<V> = {
    data: V;
    timestamp: number;
};

export class Cacher<V> {
    constructor(private key: string) {}

    get(): V | null {
        const item = localStorage.getItem(this.key);

        if (item === null) {
            return null;
        }

        const data = JSON.parse(item) as CachedData<V>;

        if (data.timestamp < Date.now()) {
            localStorage.removeItem(this.key);

            return null;
        }

        return data.data;
    }

    set(value: V): void {
        localStorage.setItem(
            this.key,
            JSON.stringify({
                data: value,
                timestamp: Date.now() + 1000 * 60 * 5,
            } as CachedData<V>),
        );
    }

    async getOrSet(value: () => Promise<V>): Promise<V> {
        const item = this.get();

        if (item !== null) {
            return item;
        }

        const newValue = await value();

        this.set(newValue);

        return newValue;
    }
}
