"use client";
import { AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function ReduxStoreProvider({ children }: { children: React.ReactNode }) {

  // const storeRef = useRef<{ store: AppStore; persistor: ReturnType<typeof persistStore> }>();
  const storeRef = useRef<{
    store: AppStore;
    persistor: ReturnType<typeof persistStore>;
  } | null>(null);

  if (!storeRef.current) {
    const store = makeStore();
    const persistor = persistStore(store);
    storeRef.current = { store, persistor };
  }

  return (
    <Provider store={storeRef.current.store}>
      <PersistGate loading={null} persistor={storeRef.current.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
