import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export const query = graphql`
  query($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        content
      }
    }
  }
`

const PostTemplate = ({ data }) => {
  const { title, content } = data.wpgraphql.post
  return (
    <Layout>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export default PostTemplate
