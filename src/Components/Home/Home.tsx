import { DefaultLayout } from "../Layout/DefaultLayout";
import { FooterMenu } from "../Layout/Footer/FooterMenu";

import logo from "./logo.svg";

export const Home = () => {
  return (
    <DefaultLayout>
      <>hw</>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div
          style={{
            height: "72px",
            width: "100%",
            backgroundColor: "#000",
            position: "sticky",
            top: "0",
          }}
        >
          <FooterMenu />
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div
          style={{
            width: "100%",
            position: "sticky",
            top: "72px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
          }}
        >
          123
        </div>

        <p style={{ color: "#FFF" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis earum
          enim, facere perferendis voluptatem voluptatum consequuntur tempora.
          Beatae totam voluptas et. Dolores inventore tenetur pariatur ipsam
          dicta ullam voluptatum maiores?
        </p>

        <p style={{ color: "#FFF" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis earum
          enim, facere perferendis voluptatem voluptatum consequuntur tempora.
          Beatae totam voluptas et. Dolores inventore tenetur pariatur ipsam
          dicta ullam voluptatum maiores?
        </p>
        <p style={{ color: "#FFF" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis earum
          enim, facere perferendis voluptatem voluptatum consequuntur tempora.
          Beatae totam voluptas et. Dolores inventore tenetur pariatur ipsam
          dicta ullam voluptatum maiores?
        </p>
        <p style={{ color: "#FFF" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis earum
          enim, facere perferendis voluptatem voluptatum consequuntur tempora.
          Beatae totam voluptas et. Dolores inventore tenetur pariatur ipsam
          dicta ullam voluptatum maiores?
        </p>
        <p style={{ color: "#FFF" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis earum
          enim, facere perferendis voluptatem voluptatum consequuntur tempora.
          Beatae totam voluptas et. Dolores inventore tenetur pariatur ipsam
          dicta ullam voluptatum maiores?
        </p>

        <div
          style={{
            height: "100px",
            width: "100%",
            position: "sticky",
            bottom: "0",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
          }}
        >
          123
        </div>
      </header>
    </DefaultLayout>
  );
};
