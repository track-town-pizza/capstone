import Link from "next/link"
import Layout from "../components/Layout"
import postData from "../../data/PostData.json" // will be removed with backend implementation
import SinglePost from "../components/SinglePost"

const postRenderLimit = 3;

/*
function getPostSet(pageNumber) {
    postSet = []

}
*/

const Blog = props => (

    /*
    const [blogState, setBlog] = useState({
        page: 0,
    })
    */

    <div>
        <Layout>
            <div className="blog-container">
                {postData.posts.map(post => (
                    <SinglePost post={post} key={post.id}/>
                ))}
            </div>
            <div id="bottom-bar"/>
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

export default Blog
