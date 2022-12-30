import * as React from "react";
import {
  Link,
  useNavigate,
  Outlet,
  useResolvedPath,
  useMatch,
  LinkProps
} from "react-router-dom";
import { useAuth } from "@/auth";
import LoadingIcon from "@/components/icon/loginicon";
import { router, RouteAndMenu, RouterReturn } from "@/router";

interface CustomLinkProps {
  folding: Array<string>;
  onSetFolding: Function;
  linkname: string | undefined;
  hasc: boolean;
}

function CustomLink({
  children,
  to,
  linkname,
  onSetFolding,
  hasc,
  folding,
  ...props
}: LinkProps & CustomLinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  const isFold = hasc && folding.includes(String(to));
  const onFolding = () => {
    onSetFolding(to, hasc);
  };
  return (
    <li className={isFold ? "menu-item-folding menu-item" : "menu-item"}>
      {linkname && (
        <Link
          style={{
            textDecoration: match ? "underline" : "none",
            color: match ? "red" : "black"
          }}
          to={to}
          {...props}
          onClick={onFolding}
        >
          {linkname}
          {match && "(active)"}
        </Link>
      )}
      {isFold && children}
    </li>
  );
}
function Menus({ arr }: { arr: Array<RouteAndMenu> }) {
  const [folding, setFolding] = React.useState([""]);
  const udateFolding = (value: string, ist: boolean) => {
    if (!value) return;
    const nv: () => string[] = () => {
      const xie = "/";
      const fi = folding.findIndex(e => e === value);
      const has = fi >= 0;
      if (has) {
        return fi > 0 ? folding.slice(0, fi) : [];
      } else {
        const ls = value.split(xie).filter(Boolean);
        return ls.reduce((pre: Array<string>, cur, i) => {
          !(i == ls.length - 1 && !ist) &&
            pre.push(
              String(i <= 0 ? `${xie}${cur}` : `${pre[i - 1]}${xie}${cur}`)
            );
          return pre;
        }, []);
      }
    };
    setFolding(nv());
  };
  function reduces(array: Array<RouteAndMenu>) {
    const result: RouterReturn = [];
    for (let index = 0; index < array.length; index++) {
      const {
        path = "",
        linkname,
        children = undefined,
        linkHidden = false
      }: RouteAndMenu = array[index];
      const hasc = !!(children && children.length);
      const child = hasc && reduces(children);
      const menu = (
        <ul className="child-menus" key={index}>
          {child}
        </ul>
      );
      const customLinkProps = {
        key: index,
        onSetFolding: udateFolding,
        folding,
        linkname,
        to: path,
        hasc
      };
      const link = <CustomLink {...customLinkProps}>{menu}</CustomLink>;
      link && !Boolean(linkHidden) && result.push(link);
    }
    return result;
  }
  const ms = arr.find(({ isLayout }) => isLayout);
  const list = ms && Reflect.has(ms, "children") ? ms?.children : [];
  return <ul className="menus">{list && reduces(list)}</ul>;
}

function AuthStatus() {
  // const [time, setItem] = React.useState(60)
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setItem(time - 1)
  //   }, 1000)
  // }, [time])
  //取消60秒后退出....
  const auth = useAuth();
  const navigate = useNavigate();
  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }
  return (
    <p>
      {/* <strong>timeout by :{time}</strong> */}
      Welcome {auth.user}!{" "}
      <button
        className="sigin-in"
        onClick={() => {
          auth.setLoading(true);
          auth.signout(() => {
            auth.setLoading(false);
            navigate("/login");
          });
        }}
      >
        Sign out
        <LoadingIcon loading={auth.loading} />
      </button>
    </p>
  );
}

export default function Layout() {
  return (
    <section className="app-section">
      <nav className="main-nav">
        <Menus arr={router}></Menus>
      </nav>
      <div className="content">
        <header>
          <AuthStatus />
        </header>
        <div className="main-container">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
