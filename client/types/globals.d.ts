export {};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any,
  }

  let __DEVELOPMENT__: any;
}
