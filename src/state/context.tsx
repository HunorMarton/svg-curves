import React, {
  createContext,
  useEffect,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import initialState from "./initialState";
import reducer, { type State, type Action } from "./reducers";
import { RESIZE, ARC_START_POINT } from "../constants/actions";

interface AppContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const originalWindowWidth = window.innerWidth;
const originalWindowHeight = window.innerHeight;

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Set initial size
    dispatch({
      type: RESIZE,
      payload: { width: originalWindowWidth, height: originalWindowHeight },
    });

    // Set initial arc
    dispatch({ type: ARC_START_POINT, payload: { x: 145, y: 174 } });
  }, [dispatch]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
