import { ReactNode } from "react";

export type ValueOf<T extends object> = T[keyof T];
export type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;

export type FormStatus = "PENDING" | "LOADING" | "ERROR" | "SUCCESS";

export interface InterceptQueryData {
  queryKey: string;
  title: string;
  children: ReactNode;
}
