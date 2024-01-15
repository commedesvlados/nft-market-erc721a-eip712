import React, {useState} from 'react';
import {Button, Col, Row} from "reactstrap";
import OfferCard from "./OfferCard.tsx";
import nftOffers from "../../contracts/Offers.json"

const seeMoreText: string = "See More";
const hideText: string = "Hide";
const startCardCount: number = 8;

const Offers = () => {
	const [toggleCards, setToggleCards] = useState<boolean>(false);

	const handleToggleCards = () => setToggleCards((prevState) => !prevState);

	return (
		<div>
			<h1>All Offers</h1>

			<Row className="gy-4" xs="1" md="2" lg="4">
				{nftOffers?.map((offer, i) => {
					if (toggleCards || (!toggleCards && i < startCardCount)) {
						return (
							<Col key={i} className="">
								<OfferCard key={i} offer={offer} />
							</Col>
						);
					}

					return null;
				})}
			</Row>

			<Button
				color="light"
				onClick={handleToggleCards}
			>
				{toggleCards ? hideText : seeMoreText}
			</Button>

		</div>
	);
};

export default Offers;