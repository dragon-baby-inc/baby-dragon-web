class LocalStore {
  set(key, value, expiresSecond) {
    const now = new Date();

    let item = {
      value: value,
      expiresAt: now.getTime() + 3600,
    };

    try {
      localStorage.setItem(key, JSON.stringify(item));
    } catch {
      console.log("[localStore] full");
    }
  }

  get(key) {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }

    const item = JSON.parse(data);
    const now = new Date();

    if (now.getTime() > item.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }

  clear() {
    localStorage.clear();
  }
}

const store = new LocalStore();

export default store;
