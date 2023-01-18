import { DefaultLayout } from "../Layout/DefaultLayout";

import logo from "./logo.svg";

export const Home = () => {
  return (
    <DefaultLayout titleElem={<>hw</>}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </DefaultLayout>
  );
};
