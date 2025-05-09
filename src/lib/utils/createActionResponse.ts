import { NonUndefined } from "../types";
import { formatErrorMessage } from "./formatErrorMessage";

export interface CreateActionResponseProps {
  data?: any;
  error?: any;
}

export interface ActionResponse<T> {
  success: boolean;
  data: NonUndefined<T>;
  errorMessage: string | null;
}

export const createActionResponse = <T>({
  data,
  error,
}: CreateActionResponseProps): ActionResponse<T> => {
  return {
    success: !error,
    data: typeof data === "undefined" ? null : data,
    errorMessage: error ? formatErrorMessage(error) : null,
  };
};
