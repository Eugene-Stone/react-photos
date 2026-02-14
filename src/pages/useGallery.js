import { useState, useEffect } from "react";

export function useGallery() {

	const [searchValue, setSearchValue] = useState("");
	const [collections, setCollections] = useState([]);
	const [tags, setTags] = useState([]);
	const [tagCurrent, setTagCurrent] = useState(0);
	const [isLoading, setisLoading] = useState(true);

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
		fetch("/data/data-images.json")
			.then((response) => response.json())
			.then((json) => {
				setCollections(json.collections);
				setTags(json.categories);
				setisLoading(false);
			})
			.catch((error) => console.error("Error fetch: ", error));
	}, []);

	// useEffect(() => {
	// 	setCurrentPage(1);
	// }, [searchValue, tagCurrent]);

	// console.log(collections);

	function handleCurrentTag(index) {
		setTagCurrent(index);
		setCurrentPage(1);

		// console.log(index);
	}

	return {
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
	};

}