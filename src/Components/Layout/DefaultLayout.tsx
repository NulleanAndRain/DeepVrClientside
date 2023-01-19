import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { FooterMenu } from "./Footer/FooterMenu";
import "../../App.css";
import {
  Root as ScrollRoot,
  Scrollbar,
  Thumb,
  Viewport,
} from "@radix-ui/react-scroll-area";

interface Props {
  children?: React.ReactNode;
}

export const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className="app-bg">
      <Content className="app-main">
        <ScrollRoot type="auto" className="ScrollAreaRoot">
          <Viewport className="ScrollAreaViewport">
            <div className="full-height-wrapper">{children}</div>
          </Viewport>
          <Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
            <Thumb className="ScrollAreaThumb" />
          </Scrollbar>
        </ScrollRoot>
      </Content>
      <Footer className="app-footer">
        <FooterMenu />
      </Footer>
    </Layout>
  );
};
