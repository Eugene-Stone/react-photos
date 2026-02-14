import CollectionCard from './CollectionCard';

export default function CollectionList({ paginatedCollections }) {
	return (
		<div className="content">
			{paginatedCollections.map((collection, index) => {
				return (
					<CollectionCard key={index} name={collection.name} images={collection.photos} />
				);
			})}
		</div>
	);
}
