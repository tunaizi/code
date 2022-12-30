import * as React from "react";
export default function LoadingIcon({ loading }: { loading: Boolean }) {
  return loading ? (
    <div className="loader">
      <div className="loader-inner line-spin-fade-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : (
    <></>
  );
}
