// @ts-nocheck
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

import axios from '../../../axios';
import Post from '../../../components/Post/Post';

import './Posts.css';

class Posts extends Component {
	state = {
		posts: [],
		selectedPostId: null
	};

	componentDidMount() {
		axios.get('/posts').then(response => {
			const posts = response.data.slice(0, 4);
			const updatedPosts = posts.map(post => {
				return {
					...post,
					author: 'Ben'
				};
			});
			this.setState({ posts: updatedPosts });
		});
	}

	postSelectedHandler = id => {
		this.setState({ selectedPostId: id });
	};

	render() {
		let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
		posts = this.state.posts.map(post => {
			return (
				<Link key={post.id} to={'/posts/' + post.id}>
					<Post
						clicked={() => this.postSelectedHandler(post.id)}
						title={post.title}
						author={post.author}
					/>
				</Link>
			);
		});
		return (
			<div>
				<section className='Posts'>{posts}</section>
				<Route
					path={this.props.match.url + '/:id'}
					exact
					component={FullPost}
				/>
			</div>
		);
	}
}

export default Posts;
