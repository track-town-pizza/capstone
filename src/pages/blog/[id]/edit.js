import React, { useState } from 'react'
import { useRouter } from "next/router"
import Link from "next/link"
import Layout from "../../../components/Layout"
import SinglePost from "../../../components/SinglePost.js"
import postData from "../../../../data/PostData.json" // will be removed with backend implementation
import SubmitButton from "../../../components/admin/SubmitPricesBtn"

// This function controls what happens when the user hits the submit button
function onClick(event) {
    const { type } = event
    let success = true
    if(type === 'click') {
        if(success) {
            // push new data (newBeverageInfo) into database
            alert("Blog post has been updated")
        }
    }
}

function correctImageLink(link) {
    const findString = "https://drive.google.com/open?id="
    const replacementString = "https://drive.google.com/uc?id="

    return link.replace(findString, replacementString)
}

const Post = () => {
	const router = useRouter()

    if (postData.posts[router.query.id] != undefined) {
        const postNum = router.query.id

        const post = postData.posts[postNum]
        const [ postTitle, setPostTitle ] = useState(post.title)
        const [ postDate, setPostDate ] = useState(post.date)
        const [ postContent, setPostContent ] = useState(post.content)
        const [ postImageLink, setPostImageLink ] = useState(post.imageLink)

        return (
            <div>
                <Layout>
                    <div className="blog-container">

                    <h2>Editing Post #{postNum}</h2>

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

                        <SubmitButton words="Save Edits" onClick={onClick} />
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
    } else {
        return (
            <Layout>
                <p>Could not display post :(</p>
            </Layout>
        )
    }
}

export default Post
