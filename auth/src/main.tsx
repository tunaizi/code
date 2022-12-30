import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { fakeAuthProvider, AuthContext } from "@/auth";
import AllRouter from "@/router";
import { ConfigProvider } from "antd";
import "@/index.css";
// import "antd/dist/reset.css";
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };
  const value = { user, signin, signout, loading, setLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b"
            }
          }}
        >
          <AllRouter />
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
