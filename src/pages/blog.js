import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export const query = graphql`
  query {
    wpgraphql {
      posts {
        nodes {
          id
          title
          uri
          excerpt
        }
      }
    }
  }
`

const Blog = ({ data }) => {
  const posts = data.wpgraphql.posts.nodes

  return (
    <Layout>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>
              <Link
                to={`/blog/${post.uri}`}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Blog
