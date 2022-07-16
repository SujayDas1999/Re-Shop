import { ComponentType } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../store/ConfigureStore";

interface Props extends RouteProps {
  component: ComponentType<RouteProps<any>> | ComponentType<any>;
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {
  const { user } = useAppSelector((state) => state.account);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
