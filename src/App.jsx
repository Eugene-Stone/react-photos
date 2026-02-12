import { Fragment, useEffect, useState } from 'react';
import Collection from './components/Collection';

function App() {
	const [searchValue, setSearchValue] = useState('');
	const [collections, setCollections] = useState([]);
	const [tags, setTags] = useState([]);
	const [tagCurrent, setTagCurrent] = useState(0);

	const [currentPage, setCurrentPage] = useState(1);
	const limitPerPage = 3;

	const filteredCollections = collections.filter(
		(object) =>
			object.name.toLowerCase().includes(searchValue.toLowerCase()) &&
			(tagCurrent === 0 || object.category === tagCurrent),
	);

	const totalPages = Math.ceil(filteredCollections.length / limitPerPage);

	const paginatedCollections = filteredCollections.slice(
		(currentPage - 1) * limitPerPage,
		currentPage * limitPerPage,
	);

	// console.log(totalPages);

	useEffect(() => {
		fetch('/data/data-images.json')
			.then((response) => response.json())
			.then((json) => {
				setCollections(json.collections);
				setTags(json.categories);
			})
			.catch((error) => console.error('Error fetch: ', error));
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchValue, tagCurrent]);

	// console.log(collections);

	function handleCurrentTag(index) {
		setTagCurrent(index);
		// console.log(index);
	}

	return (
		<Fragment>
			<div className="App">
				<h1>Моя коллекция фотографий</h1>
				<div className="top">
					<ul className="tags">
						{tags.map((tag, index) => {
							return (
								<li
									className={tagCurrent === index ? 'active' : ''}
									key={tag.name}
									onClick={() => handleCurrentTag(index)}>
									{tag.name}
								</li>
							);
						})}
					</ul>
					<input
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						className="search-input"
						placeholder="Поиск по названию"
					/>
				</div>
				<div className="content">
					{paginatedCollections.map((collection, index) => {
						return (
							<Collection
								key={index}
								name={collection.name}
								images={collection.photos}
							/>
						);
					})}
				</div>
				<ul className="pagination">
					{[...Array(totalPages)].map((_, index) => (
						<li
							key={index}
							className={currentPage === index + 1 ? 'active' : ''}
							onClick={() => setCurrentPage(index + 1)}>
							{index + 1}
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	);
}

export default App;
