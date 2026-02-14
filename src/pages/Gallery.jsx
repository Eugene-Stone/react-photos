import { useGallery } from './useGallery';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import CollectionList from './components/CollectionList';

export default function Gallery() {
	const {
		tags,
		tagCurrent,
		handleCurrentTag,
		searchValue,
		setSearchValue,
		setCurrentPage,
		paginatedCollections,
		totalPages,
		currentPage,
		isLoading,
	} = useGallery();

	return (
		<div className="App">
			<h1>Моя коллекция фотографий</h1>

			{isLoading ? (
				<h2 style={{ color: 'pink' }}>Loading...</h2>
			) : (
				<>
					<Filter
						tags={tags}
						tagCurrent={tagCurrent}
						handleCurrentTag={handleCurrentTag}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						setCurrentPage={setCurrentPage}
					/>

					<CollectionList paginatedCollections={paginatedCollections} />

					<Pagination
						totalPages={totalPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</>
			)}
		</div>
	);
}
