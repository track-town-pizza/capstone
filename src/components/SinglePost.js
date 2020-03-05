import Link from "next/link"

const SinglePost = (props) => {
    const post = props.post
    return (
        <div className="SinglePost">
            <div key={post.id}>
                <div className="d-flex justify-content-between align-items-center" id="blog-header">
                    <h3>
                        <Link href="/blog/[id]" as={`/blog/${post.id}`}>
                            <a>{post.title}</a>
                        </Link>
                    </h3>
                    <h4>{post.date}</h4>
                </div>
                <img src={post.imageLink} className="mw-100" />
                <p>{post.content}</p>
            </div>

            <style jsx>{`
                h3 {
                    display: inline-block;
                    float: left;
                }

                h4 {
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
            `}</style>
        </div>
    )
}

export default SinglePost
