import { RootState, store } from "@/index";
import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
type LoaderFn<T extends any> = (
  args: LoaderFunctionArgs<{ state: RootState }>
) => Promise<T | Response>;

export const loaderReduxWrapper = <T extends any>(args: LoaderFn<T>) => {
  return (arg: LoaderFunctionArgs<any>) => {
    return args({
      ...arg,
      context: { ...arg.context, state: store.getState() },
    });
  };
};

type LoaderOmitResponse<T> = T extends (
  arg: LoaderFunctionArgs<any>
) => Promise<infer J>
  ? J extends Response
    ? never // never로 하면 포함이 안된다. (typescript symbol?)
    : J
  : never;

export function useTypeSafeLoaderData<T extends LoaderFn<any>>() {
  const returned = useLoaderData() as Awaited<LoaderOmitResponse<T>>;
  return returned;
}
