export class LocalStorageMock {
    _storage = new Map<string, string>();
    constructor() { }

    getItem(key: string): string | null {
        return this._storage.get(key) || null;
    }

    setItem(key: string, item: string): void {
        this._storage.set(key, item);
    }

    clear(): void {
        this._storage.clear();
    }

    removeItem(key: string): void {
        this._storage.delete(key);
    }
}