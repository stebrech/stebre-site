import * as React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo";

import Layout from "../components/layout";

const NotFoundPage = () => (
  <Layout>
    <GatsbySeo
      title="Seite nicht gefunden (Fehler 404)"
      titleTemplate="%s | stebre.ch"
      twitter={{
        handle: "@stebre_ch",
        site: "@stebre_ch",
        cardType: "summary_large_image",
      }}
    />
    <div className="containerL">
      <h1>Seite nicht gefunden (Fehler 404)</h1>
      <p>Die Seite gibt’s nicht mehr oder vielleicht hast du dich vertippt.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
