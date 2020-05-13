import React from "react"
import Router from "next/router"
import fetch from "isomorphic-unfetch"

import Layout from "../components/Layout"
import SinglePost from "../components/SinglePost"

const Blog = ({ posts, page, numPages, info }) => {
	// Handles blog navigation when a navigation button is clicked
	function handleClick(event) {
		const { name, type } = event.target
		if (type === "submit") {
			if (name === "New Posts") {
				// Navigate to previous page to view newer posts
				Router.push(`/blog?page=${page - 1}`)
			} else if (name === "Old Posts") {
				// Navigate to next page to view older posts
				Router.push(`/blog?page=${page + 1}`)
			}
		}
	}

	let blogNav = <div></div>
	// Add blog navigation if there is >1 page of posts
	if (numPages > 1) {
		if (page === 1) {
			// Add older posts navigation button if on the first page and theres >1 page
			blogNav = (
				<div>
					<button name="Old Posts" onClick={handleClick}>Older Posts &rsaquo;</button>
					<style jsx> {`
						.blog-nav {
							margin-top: 10px;
							text-align: center;
							color: #007030;
						}

						button {
							background: none!important;
							border: none;
							padding: 0!important;
							color: #007030;
							cursor: pointer;
						}

						button:hover {
							text-decoration: underline;
						}
					`}</style>
				</div>
			)
		} else if (page > 1 && page < numPages) {
			// Add both newer and older posts navigation buttons due to not being
			// on the first page but also not on the last
			blogNav = (
				<div>
					<button name="New Posts" onClick={handleClick}>&lsaquo; Newer Posts</button>
					<div id="blogNavSeperator"> | </div>
					<button name="Old Posts" onClick={handleClick}>Older Posts &rsaquo;</button>
					<style jsx> {`
						#blogNavSeperator {
							margin: 7px;
							display: inline;
						}

						.blog-nav {
							margin-top: 10px;
							text-align: center;
							color: #007030;
						}

						button {
							background: none!important;
							border: none;
							padding: 0!important;
							color: #007030;
							cursor: pointer;
						}

						button:hover {
							text-decoration: underline;
						}
					`}</style>
				</div>
			)
		} else if (page === numPages) {
			// Add newer posts navigation button if on the last page and there's >1 page
			blogNav = (
				<div>
					<button name="New Posts" onClick={handleClick}>&lsaquo; Newer Posts</button>
					<style jsx> {`
						.blog-nav {
							margin-top: 10px;
							text-align: center;
							color: #007030;
						}

						button {
							background: none!important;
							border: none;
							padding: 0!important;
							color: #007030;
							cursor: pointer;
						}

						button:hover {
							text-decoration: underline;
						}
					`}</style>
				</div>
			)
		}
	}

	return (
		<Layout info={info}>
			<div className="blog-container">
				{posts.map(post => (
					<SinglePost post={post} key={post._id} />
				))}
			</div>
			<div id="bottom-bar"></div>

			<nav className="blog-nav">
				{blogNav}
			</nav>
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
		</Layout>
	)
}

Blog.getInitialProps = async context => {
	// Fetch posts in ascending order of date
	const postsJson = await fetch(`${process.env.URL_ROOT}/api/posts`).then(_ => _.json())

	// Prepare pagination
	const count = postsJson.length
	const pageSize = 3
	const lastPage = Math.ceil(count / pageSize)

	// Calculate current page with boundaries
	let page = parseInt(context.query.page) || 1
	page = page > lastPage ? lastPage : page
	page = page < 1 ? 1 : page

	// Grab current page's posts based on page size and requested page number
	const start = (page - 1) * pageSize
	const end = start + pageSize
	let pagePosts = postsJson.slice(start, end)

	const infoJson = await fetch(`${process.env.URL_ROOT}/api/info`).then(_ => _.json())

	return {
		posts: pagePosts,
		page: page,
		numPages: lastPage,
		info: infoJson
	}
}

export default Blog
