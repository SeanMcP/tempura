import { h } from "preact";
import styles from "./style.css";
import { Link } from "preact-router";

const TITLE = "Sushi Go! Friend";

export default function View({ children, title }) {
  document.title = title ? `${title} - ${TITLE}` : TITLE;
  return (
    <div className={styles.view}>
      <header role="banner">
        <span />
        <h1>{title || TITLE}</h1>
        <a href="https://seanmcp.com" target="_blank" rel="noreferrer nofollow">
          Info
        </a>
      </header>
      <main id="main" role="main">
        {children}
      </main>
    </div>
  );
}
