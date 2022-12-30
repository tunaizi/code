import * as React from "react";
import { useLocation, Navigate, useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { useAuth } from "@/auth";

import LoginPage from "@/pages/login";
import Layout from "@/layout";
import ProtectedPage from "@/pages/protected";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import HomeTest1 from "@/pages/home/test1";
import HomeCheck from "@/pages/home/check";
import NoFound from "@/pages/notfound";
import HomeCheckA from "@/pages/home/check/checka";
import HomeCheckB from "@/pages/home/check/checkb";
import CssmoduleTest from "@/pages/CssmoduleTest";

export interface RouteAndMenu {
  linkHidden?: boolean;
  path?: string | undefined;
  component: () => JSX.Element;
  requireAuth?: boolean;
  children?: Array<RouteAndMenu>;
  linkname?: string;
  isLayout?: boolean;
  index?: boolean;
}

export const router: Array<RouteAndMenu> = [
  {
    path: "/",
    component: Layout,
    isLayout: true,
    children: [
      {
        path: "/home",
        linkname: "home",
        component: HomePage,
        requireAuth: true,
        children: [
          {
            linkname: "HomeTest1",
            component: HomeTest1,
            path: "/home/test1",
            requireAuth: true
            // index: true
          },
          {
            path: "/home/check",
            linkname: "HomeCheck",
            component: HomeCheck,
            requireAuth: true,
            children: [
              {
                linkname: "check-a",
                component: HomeCheckA,
                requireAuth: true,
                path: "/home/check/a"
                // index: true
              },
              {
                linkname: "check-b",
                path: "/home/check/b",
                component: HomeCheckB,
                requireAuth: true
              }
            ]
          }
        ]
      },
      {
        linkname: "CssmoduleTest",
        component: CssmoduleTest,
        path: "/cssmodule-test",
        requireAuth: true
      },
      {
        path: "/about",
        linkname: "about",
        component: AboutPage,
        requireAuth: true
      },
      {
        path: "/protected",
        linkname: "protected",
        component: ProtectedPage,
        requireAuth: true
      }
    ]
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "*",
    component: NoFound
  }
];

export type RouterReturn = Array<React.ReactElement>;
function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();
  const islogin = localStorage.getItem("username") || auth.user;
  if (!islogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
export default function AllRouter() {
  function geteduces(array: Array<RouteAndMenu>) {
    const result: Array<RouteObject> = [];
    for (let i = 0; i < array.length; i++) {
      const {
        component: CurrentElement,
        requireAuth = false,
        index = false,
        children = undefined,
        ...props
      }: RouteAndMenu = array[i];
      const ele = requireAuth ? (
        <RequireAuth>
          <CurrentElement />
        </RequireAuth>
      ) : (
        <CurrentElement />
      );
      if (children && children.length) {
        result.push({
          ...props,
          element: ele,
          children: geteduces(children)
        });
      } else {
        const _index = index === true ? index : false;
        result.push({ ...props, index: _index, element: ele });
      }
    }
    return result;
  }
  const eles = geteduces(router);
  return <React.StrictMode>{useRoutes(eles)}</React.StrictMode>;
}
