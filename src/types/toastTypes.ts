export interface Toast {
  id: number;
  type: string;
  message: string;
}
export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";

export const ADD_TOAST = "ADD_TOAST";
export const REMOVE_TOAST = "REMOVE_TOAST";
