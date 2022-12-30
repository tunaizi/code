import * as React from "react";
import { Button } from "antd";

const HomeTestChild1 = React.forwardRef(function ({}: {}, ref) {
  const inputRef = React.useRef<any>(null);
  const [num, setNum] = React.useState<number>(0);
  const [inpval, setInpval] = React.useState<string>("");
  React.useImperativeHandle(ref, () => ({
    add(q: number) {
      setNum(num + q);
    },
    focus() {
      inputRef.current.focus();
    },
    clearVal() {
      setInpval("");
    }
  }));
  const onChangeval = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setInpval(e.target.value);
  };
  return (
    <>
      <h1>{num}</h1>
      <input
        type="text"
        onChange={e => onChangeval(e)}
        ref={inputRef}
        value={inpval}
      />
      <Button
        {...{
          children: "setNum",
          onClick: () => setNum(num + 1)
        }}
      />
    </>
  );
});

type HomeTestChild1Ref = {
  add: (p: number) => void;
  focus: () => void;
  clearVal: () => void;
};

export default function HomeTest1() {
  const childRef = React.useRef<any>(null);
  const [a, seta] = React.useState<number>(0);
  const [b, setb] = React.useState<number>(10);
  const computeExpensiveValue = (a: number, b: number) => {
    return a + b;
  };
  const setchild = () => {
    const { add }: HomeTestChild1Ref = childRef.current;
    add(5);
  };
  const setchildfocus = () => {
    const { focus }: HomeTestChild1Ref = childRef.current;
    focus();
  };
  const chref4 = (cref: HomeTestChild1Ref) => {
    //类型参数传递
    const { clearVal } = cref;
    // console.log(cref);
    clearVal();
  };

  const memoizedValue = React.useMemo(
    () => computeExpensiveValue(a, b),
    [a, b]
  );
  const btnls = {
    seta: {
      children: "changea",
      onClick: () => seta(a + ~~(Math.random() * 10))
    },
    setb: {
      children: "changea",
      onClick: () => setb(a + ~~(Math.random() * 10))
    },
    setc: {
      children: "setChild",
      onClick: setchild
    },
    setchildfocus: {
      children: "setchildfocus",
      onClick: setchildfocus
    },
    chref4: {
      children: "chref4",
      onClick: () => chref4(childRef.current)
    }
  };

  return (
    <>
      {Object.values(btnls).map((ele, key) => (
        <Button {...ele} key={key} />
      ))}
      <h1>{memoizedValue}</h1>
      <HomeTestChild1 ref={childRef} />
    </>
  );
}
