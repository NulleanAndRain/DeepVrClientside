import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import { useRef } from "react";
import "../../App.css";
import { getTestField, setTestField } from "../../Utils/redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../../Utils/redux/store";
import { FooterMenu } from "./Footer/FooterMenu";

interface Props {
  children?: React.ReactNode;
  titleElem?: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children, titleElem }) => {
  const dispatch = useAppDispatch();
  const testVal = useAppSelector((state) => getTestField(state));

  const inputRef = useRef<HTMLInputElement>(null);
  const onInput = (e: React.FormEvent) => {
    console.log(`value: ${inputRef.current?.value}, event: `, e);
    dispatch(setTestField(inputRef.current?.value));
  };
  return (
    <Layout className="app-bg">
      {titleElem && <Header className="app-header">{titleElem}</Header>}
      <Content className="app-main">{children}</Content>
      <Footer className="app-footer">
        <FooterMenu />
        <input type="text" value={testVal} onInput={onInput} ref={inputRef} />
      </Footer>
    </Layout>
  );
};
