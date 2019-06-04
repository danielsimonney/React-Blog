import React, { Component } from 'react';
import getArticles from '../services/api';
import Article from './ListArticles';
import { BrowserRouter as NavLink, Link } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			articles: [],
			listCategory: [],

			category: '',
			order: 'recent',
			Title: '',
			Author: ''
		};
	}

	componentDidMount() {
		console.log(localStorage.getItem('category'));
		if (localStorage.getItem('category') !== null) {
			this.setState({ category: localStorage.getItem('category') });
		}
		console.log('t nul');
		this.loadArticles();
		getArticles.getCat().then((json) => {
			var myCat = json.data;
			this.setState({ listCategory: myCat });
		});
	}

	loadArticles() {
		getArticles.getArticle().then((json) => {
			var myData = json.data;
			if (this.state.order === 'recent') {
				myData.reverse();
			} else {
			}
			if (this.state.category === '') {
			} else {
				myData = myData.filter((article) => article.ArticleCategory.name === this.state.category);
			}
			if (this.state.Title === '') {
			} else {
				let titleSearch = this.state.Title.toLowerCase();
				myData = myData.filter((article) => article.title.toLowerCase().includes(titleSearch) === true);
			}
			if (this.state.Author === '') {
			} else {
				console.log('sdvdv');
				let AuthorSearch = this.state.Author.toLowerCase();
				myData = myData.filter(
					(article) => article.User.firstname.toLowerCase().includes(AuthorSearch) === true
				);
			}
			this.setState({ articles: myData });
		});
	}

	handleOrderChange(event) {
		console.log(event.target.value);
		this.setState({ order: event.target.value });
		this.loadArticles();
	}
	handleChange(event) {
		console.log(event.target.value);
		localStorage.setItem('category', event.target.value);
		this.setState({ category: event.target.value });
		this.loadArticles();
	}

	handleTitle(event) {
		console.log(event.target.value);
		this.setState({ Title: event.target.value });
		this.loadArticles();
	}

	handleAuthor(event) {
		console.log(event.target.value);
		this.setState({ Author: event.target.value });
		this.loadArticles();
	}

	removecaregory(event) {
		localStorage.setItem('category', '');
		this.setState({ category: '' });
		this.loadArticles();
	}

	render() {
		return (
			<div className="container">
				{this.state.category !== '' ? (
					<div>
						<h1>Here is the list of all the articles of the category {this.state.category}</h1>
						<button
							onClick={() => {
								this.removecaregory();
							}}
						>
							Return to page of all articles.
						</button>
					</div>
				) : (
					<h1>Here is the list of all articles</h1>
				)}
				<div>Filter by category</div>
				<label for="category-select">Choose a category:</label>
				<select
					id="category-select"
					value={this.state.value}
					onChange={(event) => {
						this.handleChange(event);
					}}
				>
					{this.state.listCategory.map((category) => {
						return (
							<option id={category.id} value={category.name}>
								{category.name}
							</option>
						);
					})}
				</select>
				<h2>Search by</h2>
				<select
					value={this.state.order}
					onChange={(event) => {
						this.handleOrderChange(event);
					}}
				>
					<option id="recent">recent</option>
					<option id="last">elder</option>
				</select>
				<h2>Wanna make an advance search ??</h2>
				<form onSubmit={this.handleSubmitAuthor}>
					<div class="input-group mb-3">
						<input
							type="text"
							class="form-control"
							placeholder="Enter author username"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							onChange={(text) => {
								this.handleAuthor(text);
							}}
						/>{' '}
						<div class="input-group-append">
							<span class="input-group-text" id="basic-addon2">
								Search by author
							</span>
						</div>
					</div>
					<input type="submit" value="Search an author" />
				</form>
				<form onSubmit={this.handleSubmitTitle}>
					<div class="input-group mb-3">
						<input
							type="text"
							class="form-control"
							placeholder="Enter blog title"
							aria-label="Recipient's username"
							aria-describedby="basic-addon2"
							onChange={(text) => {
								this.handleTitle(text);
							}}
						/>{' '}
						<div class="input-group-append">
							<span class="input-group-text" id="basic-addon2">
								Search by title
							</span>
						</div>
					</div>
					<input type="submit" value="Search a blog title" />
				</form>

				<ul className="list-group">
					{this.state.articles.map((article) => {
						return <Article id={article.id} title={article.title} author={article.User.firstname} />;
					})}{' '}
				</ul>
			</div>
		);
	}
}
export default App;
