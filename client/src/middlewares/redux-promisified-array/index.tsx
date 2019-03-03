import { Dispatch } from "redux";

export default ({ dispatch }: { dispatch: Dispatch<any> }) => (
  next: Dispatch<any>
) => (action: any) => {
  if (Array.isArray(action)) {
    return Promise.all(action.map(dispatch));
  }
  return next(action);
};
