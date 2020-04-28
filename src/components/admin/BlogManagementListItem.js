import React from "react"

const BlogManagementListItem = props => {
    return (
        <div>
            <li onClick={props.removePostFunc} name={props.name}>{props.pname}</li>
            <style jsx>{`
                li {
                    padding: 10px;
                }

            `}</style>
        </div>
    )
}
export default BlogManagementListItem
