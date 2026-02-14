export default function Filter({
	tags,
	tagCurrent,
	handleCurrentTag,
	searchValue,
	setSearchValue,
	setCurrentPage,
}) {
	return (
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
				onChange={(e) => {
					setSearchValue(e.target.value);
					setCurrentPage(1);
				}}
				className="search-input"
				placeholder="Поиск по названию"
			/>
		</div>
	);
}
