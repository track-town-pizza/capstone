import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import SinglePost from "../../components/SinglePost.js"

const Post = ({ info }) => {
    const router = useRouter()
    const [ post, setPost ] = useState(null)
    let id = router.query.id

    useEffect(() => {
        console.log("== Router.Query:", router.query)
        console.log("== ID:", id)

        async function getPost() {
            const res = await fetch(`${process.env.URL_ROOT}/api/posts/${id}`).then(_ => _.json())
            setPost(res)
        }
        getPost()
    }, [])

    return (
        <Layout info={info}>
            {id == undefined ? (
                <p>The requested post does not exist. {window.location.href}</p>
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

Post.getInitialProps = async () => {
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return { info: infoJson }
}

export default Post
