import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from '../../containers/Blog/Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from './../../hoc/asyncComponent';

import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
	return import('./NewPost/NewPost');
});

class Blog extends Component {
	state = {
		auth: true
	};
	render() {
		return (
			<div className='Blogs'>
				<header>
					<nav>
						<ul>
							<li>
								<NavLink to='/posts/' exact activeClassName='active'>
									Posts
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: '/new-post',
										hash: '#submit',
										search: '?quick-submit=true'
									}}>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				{/*<Route path='/' exact render={() => <h1>Welcome Home</h1>} />*/}
				<Switch>
					{this.state.auth ? (
						<Route path='/new-post' component={AsyncNewPost} />
					) : null}
					<Route path='/posts/' component={Posts} />
					<Redirect from='/' to='/posts/' />
				</Switch>
			</div>
		);
	}
}

export default Blog;
