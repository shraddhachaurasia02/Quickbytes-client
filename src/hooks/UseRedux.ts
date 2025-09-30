import { useStoreActions, useStoreState } from "easy-peasy";

export const useReduxState: () => any = () => {
  const store = useStoreState((store) => store);
  let states = {};
  Object.values(store).forEach((e: any) => {
    states = { ...states, ...e };
  });
  return states;
};
export const useReduxAction: () => any = () => {
  const store = useStoreActions((store) => store);
  let actions = {};
  Object.values(store).forEach((e: any) => {
    actions = { ...actions, ...e };
  });
  return actions;
};
