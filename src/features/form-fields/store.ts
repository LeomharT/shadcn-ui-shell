let nextId = 0;
const results: { id: number; name: string }[] = [];
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export const formStore = {
  subscript: (listener: () => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot() {
    return results;
  },
  add(data: { name: string }) {
    results.push({ id: nextId++, ...data });
    emit();
  },
};
