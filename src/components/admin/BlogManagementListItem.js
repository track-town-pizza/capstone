import React from "react"

const BlogManagementListItem = props => {


     // This function controls what happens when the user hits the delete button
    function onClickDelete(event) {
        const { name, type } = event.target
        if(type === 'submit' || type === 'click') {
            if (confirm("Are you sure you want to delete this post? Post ID: " + toString(name))) {
                // Remove post from database
                alert("Post deleted.")
            }
        }
    }

    function onClickEdit(event) {
        const { name, type } = event.target
        if(type === 'submit' || type === 'click') {
            // Remove post from database
        }
    }

    return (

        <div>
            <li name={props.name}>
                <span className="datePart">10/20/2018</span>
                <span className="titlePart">{props.pname}</span>
                <span className="editButtonPart"><button onClick={onClickEdit}>Edit</button></span>
                <span className="deleteButtonPart" button onClick={onClickDelete}><button>Delete</button></span>
            </li>
            <style jsx>{`
                li {
                    padding: 10px;
                    margin-right: 10px;
                    margin-left: 10px;
                    border-style: solid;
                    border-width: 1px;
                }

                .datePart {
                    float: left;
                }

                .deleteButtonPart {
                    float: right;
                }

                .editButtonPart {
                    float: right;
                }


            `}</style>
        </div>
    )
}
export default BlogManagementListItem
