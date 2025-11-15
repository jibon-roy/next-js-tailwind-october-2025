"use client";
import { AppStore, makeStore } from "@/redux/store";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function ReduxStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { store, persistor } = useMemo((): {
    store: AppStore;
    persistor: ReturnType<typeof persistStore>;
  } => {
    const store = makeStore();
    const persistor = persistStore(store);
    return { store, persistor };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
