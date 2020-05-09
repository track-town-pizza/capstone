import React, { useState } from 'react'
import Link from "next/link"
import { format, formatISO } from "date-fns"

import Layout from "../../components/Layout"
import ManagementHubButton from "../../components/admin/ManagementHubButton"
import GeneralButton from "../../components/admin/GeneralBtn"

const Post = ({ info }) => {
    let todaysDate =  new Date()

    const emptyPost = {
        "id": "",
        "date": format(new Date(), 'MM/dd/yyyy'),
        "title": "",
        "content": "",
        "imageLink": ""
    }

    const [ post, setPost ] = useState(emptyPost)
    const [ postTitle, setPostTitle ] = useState(post.title)
    const [ postDate, setPostDate ] = useState(post.date)
    const [ postContent, setPostContent ] = useState(post.content)
    const [ postImageLink, setPostImageLink ] = useState(post.imageLink)

    // This function controls what happens when the user hits the submit button
    async function onClick(event) {
        const { type } = event
        let success = true
        if (type === 'click') {
            if (success) {
                // push new post data into database
                alert("Blog post has been created")

                // Grab existing IDs from database
                const posts = await fetch(`${process.env.URL_ROOT}/api/posts`).then(_ => _.json())
                const postIds = posts.map(p => p.id)

                // Find largest existing ID to compute new post's ID
                let maxId = 0
                postIds.forEach(id => {
                    if (id > maxId) {
                        maxId = id
                    }
                })

                console.log("== Largest ID:", maxId)

                // Set up new post
                let post = {
                    id: maxId + 1,
                    title: postTitle,
                    date: formatISO(new Date()),
                    content: postContent,
                    imageLink: postImageLink
                }

                // Insert new post in DB
                const res = await fetch(`${process.env.URL_ROOT}/api/posts`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ post })
                }).then(_ => _.json())

                // Display error message if an error occurred during insertion
                if (res.err) {
                    alert(`The following error occurred: ${res.err}`)
                }

                // Display success message if OK returned with inserted ID
                if (res.message === "OK" && res.insertedId) {
                    alert("Post has successfully been inserted.")
                }
            }
        }
    }

    function correctImageLink(link) {
        const findString = "https://drive.google.com/open?id="
        const replacementString = "https://drive.google.com/uc?id="

        return link.replace(findString, replacementString)
    }

    return (
        <div>
            <Layout info={info}>
                <div className="blog-container">

                <h2>Creating New Post</h2>

                    <div className="forms mt-4">
                        <form className="form-spacing">
                            <div className="form-group">

                                <label htmlFor="postTitle">Title</label>
                                <input type="text" id="title" name="title" className="form-control"
                                    value={postTitle} onChange={e => setPostTitle(e.target.value)} />
                                <p/>

                                <label htmlFor="postDate">Date </label><small> (Format: YYYY-MM-DD)</small>
                                <input type="date" id="date" name="date" className="form-control"
                                    value={postDate} onChange={e => setPostDate(e.target.value)} />
                                <p/>

                                <label htmlFor="postImageLink">Image Link</label>
                                <input type="url" id="imageLink" name="imageLink" className="form-control"
                                    value={postImageLink} onChange={e => setPostImageLink(correctImageLink(e.target.value))} />
                                <p/>

                                <label htmlFor="postContent">Content</label>
                                <textarea rows="6" type="text" id="content" name="content" className="form-control"
                                    value={postContent} onChange={e => setPostContent(e.target.value)} />
                                <p/>

                            </div>
                        </form>
                    </div>


                    <h2>Post Preview:</h2>

                    <div className="SinglePost">
                        <div key={post.id}>
                            <div className="d-flex justify-content-between align-items-center" id="blog-header">
                                <h3>
                                    <Link href="/blog/[id]" as={`/blog/${post.id}`}>
                                        <a className="text-success">{postTitle}</a>
                                    </Link>
                                </h3>
                                <h4>{postDate}</h4>
                            </div>
                            <img src={postImageLink} className="mw-100" />
                            <p>{postContent}</p>
                        </div>
                    </div>


                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-inline p-2">
                            <ManagementHubButton/>
                        </div>
                        <div className="d-inline p-2">
                            <GeneralButton words="Create Post" onClick={onClick} link="none" />
                        </div>
                    </div>

                </div>
            </Layout>

            <style jsx>{`
                .blog-container {
                    margin-left: 20%;
                    margin-right: 20%;
                    width: 60%;
                }

                h3 {
                    display: inline-block;
                    float: left;
                }

                .titleElement {
                    display: inline-block;
                    float: left;
                }

                .postElement {
                    display: block;
                    float: right;
                    font-size: 1em;
                    margin-left: 20px;
                }

                h4 {
                    display: block;
                    float: right;
                    font-size: 1em;
                    //margin-left: 20px;
                }

                img {
                    display: block;
                    margin-top: 15px;
                    margin-bottom: 15px;
                    margin-left: auto;
                    margin-right: auto;
                    max-height: 600px;
                    max-width: 60px;
                }

                .SinglePost {
                    background: #F8F8F8;
                    border: 1px solid #EDEDED;
                    box-sizing: border-box;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 30px;
                }

                #content {
                    white-space: pre-wrap;
                    margin-bottom: 30px;
                }

                p {
                    white-space: pre-wrap;
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
    )
}

Post.getInitialProps = async () => {
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return { info: infoJson }
}

export default Post
