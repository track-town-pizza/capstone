import Link from "next/link"

const SinglePost = (props) => {
    const post = props.post
    return (
        <div className="SinglePost">
            <div key={post.id}>
                <h3>
                    <Link href="/blog/[id]" as={`/blog/${post.id}`}>
                        <a>{post.title}</a>
                    </Link>
                </h3>
                <small>{post.date}</small>
                <img src={post.imageLink} className="mw-100" />
                <p>{post.content}</p>
            </div>

            <style jsx>{`
                img {
                    margin-top: 15px;
                    margin-bottom: 15px;
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
