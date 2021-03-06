import React, { useState } from "react"

// Gatsby
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

// Components
import Layout from "../components/layout"
import SEO from "../components/Seo"
import { Helmet } from "react-helmet"
import Nav from "../components/Nav"

// Data
import { frontend, codeBio, filmBio, socialNetworks } from "../data/data"

// Styles
import {
  GlobalStyle,
  StyledHeader,
  StyledContent,
  Text,
} from "../design-system"

// const style = {
//   height: "100vh",
// }

const IndexPage = ({ data }) => {
  const [bodyClass, setBodyClass] = useState(false)
  const image = data.socialImage.childImageSharp.fluid

  const toggleCode = () => {
    if (bodyClass) {
      setBodyClass(false)
    }
  }

  const toggleFilm = () => {
    if (bodyClass !== true) {
      setBodyClass(true)
    }
  }

  return (
    <>
      <GlobalStyle />
      <Layout toggle={bodyClass}>
        <SEO title="Seth Hall Creative" image={image} />
        <div>
          <Helmet>
            <body className={`${bodyClass ? "film" : "code"}`} />
            <title>Home</title>
          </Helmet>
          <StyledContent>
            <section className="header">
              <StyledHeader>
                <Nav toggleCode={toggleCode} toggleFilm={toggleFilm}></Nav>
              </StyledHeader>
            </section>
            <section className="avatar">
              <div className="toggle-content toggle-avatar">
                <div className="code-content">
                  <Image
                    fluid={data.code.childImageSharp.fluid}
                    className="image"
                  />
                </div>
                <div className="film-content">
                  <Image
                    fluid={data.film.childImageSharp.fluid}
                    className="image"
                  />
                </div>
              </div>
            </section>
            <section className="content">
              <Text is="h1">Seth Hall</Text>
              <div className="toggle-content toggle-header">
                <Text is="h3" className="code-content">
                  Web Developer{" "}
                </Text>
                <Text is="h3" className="film-content">
                  Creative Producer
                </Text>
              </div>
              <p className="toggle-content toggle-intro">
                <span className="code-content">
                  {codeBio}{" "}
                  <Link to="/front-end-portfolio" className="link">
                    Click&nbsp;to&nbsp;view&nbsp;portfolio.
                  </Link>
                </span>
                <span className="film-content">
                  {filmBio}{" "}
                  <a
                    href="https://hallpictures.us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Click&nbsp;to&nbsp;visit&nbsp;site.
                  </a>
                </span>
              </p>
            </section>
            <section className="footer">
              <div className="content-footer">
                <div className="links">
                  <div className="toggle-content">
                    <div className="code-content">
                      {/* <button>
                        <Link to="/front-end-portfolio">Portfolio</Link>
                      </button> */}
                    </div>
                    <div className="film-content">
                      {/* <button bg="black" color="white">
                        <a
                          href="https://hallpictures.us"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Site
                        </a>
                      </button> */}
                    </div>
                  </div>
                </div>
                <div className="social">
                  {socialNetworks.map((social, index) => (
                    <a
                      href={bodyClass ? `${social.filmUrl}` : `${social.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={social.codeContentOnly ? "code-content" : ""}
                    >
                      <div className="fa-stack fa-1x">
                        <i class="fas fa-circle fa-stack-2x"></i>
                        <i class={`fa-stack-1x fa-inverse ${social.faClass}`}>
                          <span
                            className={social.hasContent ? "has-content" : ""}
                          >
                            {social.hasContent ? `${social.content}` : ""}
                          </span>
                        </i>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </StyledContent>
        </div>
      </Layout>
    </>
  )
}

export const query = graphql`
  query {
    code: file(relativePath: { eq: "seth-code.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    film: file(relativePath: { eq: "seth-film.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    socialImage: file(relativePath: { eq: "social-card.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
