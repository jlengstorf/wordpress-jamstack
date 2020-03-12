import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import "@wordpress/block-library/build-style/style.css"

const Layout = ({ children }) => {
  const menu = useStaticQuery(graphql`
    query {
      wpgraphql {
        menus {
          nodes {
            menuItems {
              nodes {
                url
                label
              }
            }
          }
        }
        generalSettings {
          url
        }
      }
    }
  `)

  const url = menu.wpgraphql.generalSettings.url
  // TODO don't do this
  const menuItems = menu.wpgraphql.menus.nodes[0].menuItems.nodes.map(item => ({
    label: item.label,
    url: item.url.replace(url, ""),
  }))

  return (
    <>
      <header>
        <Link to="/">My Jamstack WordPress Site</Link>
        {menuItems
          .filter(item => item.url !== "/")
          .map(item => (
            <>
              {" "}
              <Link to={item.url}>{item.label}</Link>
            </>
          ))}
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
