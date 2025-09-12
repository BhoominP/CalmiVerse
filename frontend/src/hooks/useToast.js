import { useState, useEffect } from "react";

let listeners = [];
let memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts] };
    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toastId ? { ...t, open: false } : t
        ),
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export function toast({ title, description }) {
  const id = genId();

  dispatch({
    type: "ADD_TOAST",
    toast: { id, title, description, open: true },
  });

  // Auto remove after 3s
  setTimeout(() => {
    dispatch({ type: "DISMISS_TOAST", toastId: id });
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", toastId: id });
    }, 500);
  }, 3000);

  return id;
}

export function useToast() {
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((l) => l !== setState);
    };
  }, []);

  return { ...state, toast };
}
