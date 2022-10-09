import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="Seite nicht gefunden (Fehler 404)" />
    <h1>Seite nicht gefunden (Fehler 404)</h1>
    <p>Die Seite gibt’s nicht mehr oder vielleicht hast du dich vertippt.</p>
    <p>Nutze doch das Suchfeld oben. Dann wirst du hoffentlich fündig.</p>
  </Layout>
)

export default NotFoundPage
