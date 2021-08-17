import React, { createContext, useReducer } from "react";
import RenderToast from "../shared/toast/toast";
import { ADD_TOAST, REMOVE_TOAST, Toast } from "../types/toastTypes";

export const ToastContext = createContext<any>([]);

export default function ToastProvider({ ...props }: any) {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case ADD_TOAST: {
        handleRemoveToast(action.payload.id, 5000);
        return [...state, action.payload];
      }
      case REMOVE_TOAST: {
        return state.filter((toast: Toast) => toast.id !== action.id);
      }
      default:
        return state;
    }
  }, []);
  function handleRemoveToast(id: number, duration: number) {
    setTimeout(() => {
      dispatch({
        type: REMOVE_TOAST,
        id: id,
      });
    }, duration);
  }
  return (
    <ToastContext.Provider value={dispatch}>
      {state.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <div
            style={{ height: "90vh", overflowY: "auto", overflowX: "hidden" }}
          >
            {state.map((toast: Toast) => {
              return (
                <div className="p-2" key={toast.id}>
                  <RenderToast
                    id={toast.id}
                    type={toast.type}
                    message={toast.message}
                    click={() => handleRemoveToast(toast.id, 500)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {props.children}
    </ToastContext.Provider>
  );
}
