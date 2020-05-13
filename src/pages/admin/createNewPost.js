import React, { useState } from 'react'
import Link from "next/link"
import Router from "next/router"
import { format, formatISO, addDays } from "date-fns"

import Layout from "../../components/Layout"
import Modal from "../../components/Modal"
import ManagementHubButton from "../../components/admin/ManagementHubButton"

const Post = ({ info }) => {
    let emptyPost = {
        id: "",
        date: format(new Date(), "yyyy-MM-dd"),
        title: "",
        content: "",
        imageLink: ""
    }

    const [ post, setPost ] = useState(emptyPost)
    const [ postTitle, setPostTitle ] = useState(post.title)
    const [ postDate, setPostDate ] = useState(post.date)
    const [ postContent, setPostContent ] = useState(post.content)
    const [ postImageLink, setPostImageLink ] = useState(post.imageLink)
    const [ displayModal, setDisplayModal ] = useState(false)
    const [ modalMessage, setModalMessage ] = useState("")

    // Display modal for 3 seconds
	function displayToast() {
		setDisplayModal(true)
		setTimeout(() => setDisplayModal(false), 3000)
	}

    // This function controls what happens when the user hits the submit button
    async function onSubmit(event) {
        // push new post data into database
        event.preventDefault()

        // Grab existing IDs from database
        const posts = await fetch(`${process.env.URL_ROOT}/api/posts`).then(_ => _.json())
        const postIds = posts.map(p => parseInt(p.id))

        // Find largest existing ID to compute new post's ID
        let maxId = 0
        postIds.forEach(id => {
            if (id > maxId) {
                maxId = id
            }
        })

        // Set up new post
        let newPost = {
            id: `${maxId + 1}`,
            title: postTitle,
            date: formatISO(new Date(addDays(new Date(postDate), 1))),
            content: postContent,
            imageLink: postImageLink
        }

        // Insert new post in DB
        const res = await fetch(`${process.env.URL_ROOT}/api/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ post: newPost })
        }).then(_ => _.json())

        if (res.err) {
            // Display error toast if error message is returned from DB API
            setModalMessage("An error occurred. Post could not be added. Please try again later.")
            displayToast()
        } else if (res.message === "OK") {
            // Display success toast if OK message is returned from DB API
            setModalMessage("Post has successfully been added.")
            displayToast()

            // Redirect to newly added blog post's page
            Router.push("/admin/manageBlog")
        }
    }

    function correctImageLink(link) {
        const findString = "https://drive.google.com/open?id="
        const replacementString = "https://drive.google.com/uc?id="

        return link.replace(findString, replacementString)
    }

    return (
        <Layout info={info}>
            {displayModal && (
                <Modal message={modalMessage} onClick={() => setDisplayModal(false)} />
            )}
            <form className="blog-container" onSubmit={onSubmit}>
                <h2>Creating New Post</h2>
                <div className="forms mt-4">
                    <div className="form-spacing">
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
                    </div>
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
                            <h4>{format(addDays(new Date(postDate), 1), "MM/dd/yyyy")}</h4>
                        </div>
                        <img src={postImageLink} className="mw-100" />
                        <p>{postContent}</p>
                    </div>
                </div>


                <div className="d-flex flex-row justify-content-between">
                    <div className="d-inline p-2">
                        <ManagementHubButton />
                    </div>
                    <div className="d-inline p-2">
                        <button type="submit" className="btn btn-green">Create Post</button>
                    </div>
                </div>

            </form>

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

            .btn-green {
                background-color: #42a86e;
                border: 1px solid #3f855d;
                color: white;
            }

            .btn-green:hover {
                background-color: #3f855d;
            }
            
            @media only screen and (max-width: 700px) {
                .blog-container {
                    margin-left: 10%;
                    margin-right: 10%;
                    width: 80%;
                }
            }
            `}</style>
        </Layout>
    )
}

Post.getInitialProps = async () => {
    const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

    return { info: infoJson }
}

export default Post
