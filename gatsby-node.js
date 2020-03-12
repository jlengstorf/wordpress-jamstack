exports.createPages = async ({ actions, graphql }) => {
  const GET_PAGES = `
    query {
      wpgraphql {
        pages {
          nodes {
            uri
            id
            isFrontPage
          }
        }
        posts {
          nodes {
            uri
            id
          }
        }
      }
    }
  `

  const result = await graphql(GET_PAGES)

  result.data.wpgraphql.pages.nodes.forEach(page => {
    actions.createPage({
      path: page.isFrontPage ? "/" : page.uri,
      component: require.resolve("./src/templates/page-template.js"),
      context: { id: page.id },
    })
  })

  result.data.wpgraphql.posts.nodes.forEach(post => {
    actions.createPage({
      path: `blog/${post.uri}`,
      component: require.resolve("./src/templates/post-template.js"),
      context: { id: post.id },
    })
  })
}
