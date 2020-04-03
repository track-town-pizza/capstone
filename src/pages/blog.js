import React from "react"
import Link from "next/link"
import fetch from "isomorphic-unfetch"

import Layout from "../components/Layout"
import SinglePost from "../components/SinglePost"

const postRenderLimit = 3;

/*
function getPostSet(pageNumber) {
    postSet = []

}
*/

const Blog = ({ posts }) => (

    /*
    const [blogState, setBlog] = useState({
        page: 0,
    })
    */

    <div>
        <Layout>
            <div className="blog-container">
                {posts.map(post => (
                    <SinglePost post={post} key={post._id}/>
                ))}
            </div>
            <div id="bottom-bar"/>

            <nav className="blog-nav">
                <a href="#">1</a>.....
                <a href="#">2</a>.....
                <a href="#">3</a>.....
                <a href="#">Earliest Post</a> -->
            </nav>
        </Layout>

        <style jsx>{`
            .blog-container {
                margin-left: 20%;
                margin-right: 20%;
                width: 60%;
            }

            #bottom-bar {
                margin-left: 20%;
                margin-right: 20%;
                width: 60%;
                height: 3px;
                left: 27px;
                top: 771px;
                background: #007030;
                transform: matrix(1, 0, 0, -1, 0, 0);
            }

            .blog-nav {
                margin-top: 10px;
                text-align: center;
                color: #007030;
            }

            .blog-nav a {
                color: #007030;
            }


            @media only screen and (max-width: 700px) {
                .blog-container {
                    margin-left: 10%;
                    margin-right: 10%;
                    width: 80%;
                }

                #bottom-bar {
                    margin-left: 10%;
                    margin-right: 10%;
                    width: 80%;
                }

            }


        `}</style>

    </div>
)

Blog.getInitialProps = async () => {
    const resJson = await fetch(`${process.env.URL_ROOT}/api/posts`).then(_ => _.json())

    return { posts: resJson }
}

export default Blog
