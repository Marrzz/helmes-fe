import { FC, PropsWithChildren } from "react";

export type ReactComponent<T = object> = FC<PropsWithChildren<T>>;