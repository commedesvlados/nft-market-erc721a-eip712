import {useEffect, useState} from 'react';
import {useReadContract, useReadContracts} from 'wagmi'
import { toast } from "react-toastify";

import CollectionCard from "./CollectionCard.tsx";

import abi from '../../contracts/abi/NFTCollection.json';
import {Button, Col, Row, Spinner} from "reactstrap";

const seeMoreText: string = "See More";
const hideText: string = "Hide";
const startCardCount: number = 8;

const collectionContractConfig = {
	abi,
	address: import.meta.env.VITE_COLLECTION_CONTRACT_ADDRESS,
};

const Collection = () => {
	const { data: totalSupply, error: totalSupplyError } = useReadContract({
		...collectionContractConfig,
		functionName: 'totalSupply',
	});

	const {data: tokenURIs, error: tokenURIsError} = useReadContracts({
		// @ts-ignore
		contracts: [...new Array(Number(totalSupply ? totalSupply : 0))].map(
			(_, i) => ({
				...collectionContractConfig,
				functionName: 'tokenURI',
				args: [BigInt(i)],
			}) as const,
		)
	});

	const [toggleCards, setToggleCards] = useState<boolean>(false);
	const handleToggleCards = () => setToggleCards((prevState) => !prevState);

	useEffect(() => {
		if (totalSupplyError) toast.error(totalSupplyError.message);
		if (tokenURIsError) toast.error(tokenURIsError.message);
	}, [totalSupplyError, tokenURIsError]);

	return (
		<div>
			<h1>All Minted NFTs</h1>

			{totalSupply
				? <p>totalSupply: {totalSupply?.toString()}</p>
				: <Spinner />
			}

			<Row className="gy-4" xs="1" md="2" lg="4">
				{tokenURIs
					? tokenURIs?.map((uri, i) => {
						if (toggleCards || (!toggleCards && i < startCardCount)) {
							return (
								<Col key={i} className="">
									<CollectionCard key={i} imgSrc={uri.result as string} tokenId={i}/>
								</Col>
							);
						}

						return null;
					})
					: <Spinner />
				}
			</Row>

			{tokenURIs?.length && tokenURIs?.length > startCardCount
				? (<Button color="light" onClick={handleToggleCards}>
					{toggleCards ? hideText : seeMoreText}
				</Button>)
				: null
			}
		</div>
	);
};

export default Collection;