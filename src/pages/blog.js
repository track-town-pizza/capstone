import Link from "next/link"
import React, {useState} from "react"
import Layout from "../components/Layout"
import postData from "../../data/PostData.json" // will be removed with backend implementation
import SinglePost from "../components/SinglePost"

const postRenderLimit = 3

/*
function getPostSet(pageNumber) {
    postSet = []

}
*/

const postCount = 10 // Need to query database on how many posts there are

/*
const BlogNav = () => {

    function onClick(event) {
            const { type } = event
            if (type ===

*/


const Blog = () => {

    const firstPage = true
    const lastPage = true


    const [blogState, setBlog] = useState({
        posts: []
    })


    return (
        <div>
            <Layout>
                <div className="blog-container">
                    {postData.posts.map(post => (
                        <SinglePost post={post} key={post.id}/>
                    ))}
                </div>
                <div id="bottom-bar"/>

                <nav className="blog-nav">

                    <a href="#">&lsaquo; Newer Posts</a>
                    <div id="blogNavSeperator"> | </div>
                    <a href="#">Older Posts &rsaquo;</a>

                    {/*
                    <a href="#">1</a>.....
                    <a href="#">2</a>.....
                    <a href="#">3</a>.....
                    <a href="#">Earliest Post</a> -->
                    */}
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

                #blogNavSeperator {
                    margin: 7px;
                    display: inline;
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
}

export default Blog
