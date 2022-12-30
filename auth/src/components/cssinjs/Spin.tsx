import React from "react";
import classNames from "classnames";
import { useToken } from "./theme";
import type { DerivativeToken } from "./theme";

import type { CSSInterpolation } from "@ant-design/cssinjs";
import { useStyleRegister, Keyframes } from "@ant-design/cssinjs";

const animation = new Keyframes("loading-Circle", {
  to: {
    transform: `rotate(360deg)`
  }
});

console.log(animation);


// 通用框架
const genSpinStyle = (
  prefixCls: string,
  token: DerivativeToken,
  hashId: string
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      width: 20,
      height: 20,
      backgroundColor: token.primaryColor,
      // animation: `${animation.getName(hashId)} 1s infinite linear`
    }
  },
  // animation
];

type SpinProps = React.HTMLAttributes<HTMLDivElement>;

const CssInJSSpin = ({ className, ...restProps }: SpinProps) => {
  const prefixCls = "ant-ass-spin";

  // 【自定义】制造样式
  const [theme, token, hashId] = useToken();

  // 全局注册，内部会做缓存优化
  const wrapSSR = useStyleRegister(
    { theme, token, hashId, path: [prefixCls] },
    () => [genSpinStyle(prefixCls, token, hashId)]
  );

  return wrapSSR(
    <div className={classNames(prefixCls, hashId, className)} {...restProps} />
  );
};

export default CssInJSSpin;
