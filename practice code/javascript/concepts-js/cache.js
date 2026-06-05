class Cache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttlMs = 1000) {
    if (this.cache.has(key)) {
      const { timeoutId } = this.cache.get(key);
      clearTimeout(timeoutId);
    }

    const timeoutId = setTimeout(() => {
      this.cache.delete(key);
    }, ttlMs);
    this.cache.set(key, { value, timeoutId });
  }

  get(key) {
    const { value } = this.cache.get(key) ?? {};
    return value;
  }
}
