import React from "react"
import Link from "next/link"
import { format } from "date-fns"

const SinglePost = ({ post }) => {
    const formattedDate = format(new Date(post.date), "MM/dd/yyyy")
    return (
        <div className="SinglePost">
            <div key={post.id}>
                <div className="d-flex justify-content-between align-items-center" id="blog-header">
                    <h2>
                        <Link href="/blog/[id]" as={`/blog/${post._id}`}>
                            <a className="text-success">{post.title}</a>
                        </Link>
                    </h2>
                    <p className="date">{formattedDate}</p>
                </div>
                <img src={post.imageLink} className="mw-100" aria-hidden="true"/>
                <p>{post.content}</p>
            </div>

            <style jsx>{`
                h2 {
                    display: inline-block;
                    float: left;
                }

                .date {
                    display: block;
                    float: right;
                    font-size: 1em;
                    margin-left: 20px;
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

                p {
                    white-space: pre-wrap;
                }
            `}</style>
        </div>
    )
}

export default SinglePost
