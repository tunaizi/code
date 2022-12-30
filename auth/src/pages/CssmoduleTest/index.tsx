import * as React from "react";
import cls from "./cssmoduletets.module.css";
import CssInJSButton from "@/components/cssinjs/Button";
import CssInJSSpin from "@/components/cssinjs/Spin";
import { DesignTokenContext, ThemeContext } from '@/components/cssinjs/theme';
import type { DesignToken, DerivativeToken } from '@/components/cssinjs/theme';
import { createTheme } from '@ant-design/cssinjs';

function derivativeA(designToken: DesignToken): DerivativeToken {
  return {
    ...designToken,
    primaryColor: 'red',
    primaryColorDisabled: 'red',
  };
}

function derivativeB(designToken: DesignToken): DerivativeToken {
  return {
    ...designToken,
    primaryColor: 'yellowgreen',
    primaryColorDisabled: 'yellowgreen',
  };
}

const ButtonList = () => (
  <div style={{ background: 'rgba(0,0,0,0.1)', padding: 16 }}>
    <CssInJSButton>Default</CssInJSButton>
    <CssInJSButton type="primary">Primary</CssInJSButton>
    <CssInJSButton type="ghost">Ghost</CssInJSButton>
    <CssInJSSpin>Ghost</CssInJSSpin>
  </div>
);

const CssmoduleTest: () => JSX.Element = () => {
  const [, forceUpdate] = React.useState({});
  return (
    <>
      <h1 className={cls.className111}>ssssssssssssssssssssssssssssssssssss</h1>
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 8 }}>
      <h3>混合主题</h3>

      <DesignTokenContext.Provider value={{ hashed: true }}>
        {/* <ButtonList />

        <ThemeContext.Provider value={createTheme(derivativeA)}>
          <ButtonList />
        </ThemeContext.Provider> */}

        <ThemeContext.Provider value={createTheme(derivativeB)}>
          <ButtonList />
        </ThemeContext.Provider>
      </DesignTokenContext.Provider>

      <button
        onClick={() => {
          forceUpdate({});
        }}
      >
        Force ReRender
      </button>
    </div>
    </>
  );
};
export default CssmoduleTest;
