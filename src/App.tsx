import { create } from "zustand";
import { Button } from "./components/ui/button";

const useStore = create<{
  count: number;
  inc: () => void;
  dec: () => void;
}>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));

export default function App() {
  const store = useStore();

  return (
    <>
      <Button onClick={store.inc}>Increment</Button>
      {store.count}
      <Button onClick={store.dec}>Decrement</Button>
    </>
  );
}
