import { IStore, model } from ".";
import { Store, createStore } from "easy-peasy";

export const store: Store<IStore> = createStore(model);
