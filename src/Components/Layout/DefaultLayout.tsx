import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import "../../App.css";
import { FooterMenu } from "./Footer/FooterMenu";

interface Props {
  children?: React.ReactNode;
  titleElem?: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children, titleElem }) => {
  return (
    <Layout className="app-bg">
      {titleElem && <Header className="app-header">{titleElem}</Header>}
      <Content className="app-main">{children}</Content>
      <Footer className="app-footer">
        <FooterMenu />
      </Footer>
    </Layout>
  );
};
