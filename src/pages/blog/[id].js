import React from "react"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import SinglePost from "../../components/SinglePost.js"

const Post = ({ post, info }) => {
    // Set ID value to post's ID value only if post exists
    let id = undefined
    if (post) {
        id = post.id
    }

    return (
        <Layout info={info}>
            {id == undefined ? (
                <p>The requested post does not exist.</p>
            ) : post != null ? (
                <div className="blog-container">
                    <SinglePost post={post} key={post._id}/>
                    <style jsx>{`
                        .blog-container {
                            margin-left: 15%;
                            margin-right: 15%;
                            width: 70%;
                        }
                        
                        @media only screen and (max-width: 700px) {
                            .blog-container {
                                margin-left: 10%;
                                margin-right: 10%;
                                width: 80%;
                            }
                        }
                        `}</style>
                </div>
            ) : (
                <p>Uh oh, something went wrong! We could not display your post. Please check your Internet connection and try again later.</p>
            )}  
        </Layout>
    )
}

Post.getInitialProps = async context => {
    // Fetch blog post with ID provided in URL route
    const id = context.query.id
    let postJson = await fetch(`${process.env.URL_ROOT}/api/posts/${id}`).then(_ => _.json())

    // Set postJson to null if an error was returned
    if (postJson.err) {
        postJson = null
    }

    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return {
        post: postJson,
        info: infoJson
    }
}

export default Post
