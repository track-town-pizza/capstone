import React from "react"

import BlogManagementListItem from "./BlogManagementListItem"

const BlogManagementList = props => {
    return (
        <div>
            <ul className="list-group">
                {props.postInfos.map(postInfo => (
                    <BlogManagementListItem removePostFunc={props.removePostFunc} pname={postInfo} name={postInfo} />
                ))}

            </ul>

            <button onClick={props.removePostFunc} name={props.pname}/>

            <style jsx>{`

            `}</style>
        </div>
    )
}
export default BlogManagementList
