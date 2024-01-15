import {Card, CardBody, CardTitle} from "reactstrap";


interface ICollectionCardProps {
	imgSrc: string;
	tokenId: number;
}
const CollectionCard = ({imgSrc, tokenId}: ICollectionCardProps) => {

	return (
		<Card style={{width: '300px'}}>
				<img alt={imgSrc} src={imgSrc}/>
			<CardBody>
				<CardTitle tag="h5">Token ID: #{tokenId}</CardTitle>
			</CardBody>
		</Card>
	);
};

export default CollectionCard;