import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"
import SinglePost from "../../components/SinglePost.js"
import postData from "../../../data/PostData.json" // will be removed with backend implementation

const Post = () => {
    const router = useRouter()
    const { id } = router.query

    const [ post, setPost ] = useState({})

    useEffect(() => {
        console.log("In useEffect()")

        async function getPost() {
            console.log("In getPost()")
            const res = await fetch(`${process.env.URL_ROOT}/api/posts/${id}`).then(_ => _.json())
            setPost(res)
            console.log("== Post in getPost():", post)
        }
    
        getPost()
    }, [])

    return (
        <Layout>
            {post != null ? (
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

export default Post
