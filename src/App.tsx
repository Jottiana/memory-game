import { useState, useEffect } from "react";

type Card = {
	id: number;
	value: string;
	isFlipped: boolean;
	isMatched: boolean;
};

const cardValues = ["🍎", "🍌", "🍒", "🍇", "🍉", "🥝", "🍍", "🥥"];

const shuffleCards = (values: string[]): Card[] => {
	const doubledValues = [...values, ...values];
	return doubledValues
		.map((value, index) => ({
			id: index,
			value,
			isFlipped: false,
			isMatched: false,
		}))
		.sort(() => Math.random() - 0.5);
};

const App = () => {
	const [cards, setCards] = useState<Card[]>([]);
	const [selectedCards, setSelectedCards] = useState<number[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		setCards(shuffleCards(cardValues));
	}, []);

	const handleCardClick = (id: number) => {
		if (isProcessing || selectedCards.includes(id)) return;

		const updatedCards = cards.map((card) =>
			card.id === id ? { ...card, isFlipped: true } : card,
		);

		setCards(updatedCards);
		setSelectedCards((prev) => [...prev, id]);

		if (selectedCards.length === 1) {
			setIsProcessing(true);
			setTimeout(() => checkMatch(updatedCards, id), 800);
		}
	};

	const checkMatch = (updatedCards: Card[], secondId: number) => {
		const firstId = selectedCards[0];
		const firstCard = updatedCards.find((c) => c.id === firstId);
		const secondCard = updatedCards.find((c) => c.id === secondId);

		let newCards: Card[];
		if (firstCard && secondCard && firstCard.value === secondCard.value) {
			newCards = updatedCards.map((card) =>
				card.id === firstId || card.id === secondId
					? { ...card, isMatched: true }
					: card,
			);
		} else {
			newCards = updatedCards.map((card) =>
				card.id === firstId || card.id === secondId
					? { ...card, isFlipped: false }
					: card,
			);
		}

		setCards(newCards);
		setSelectedCards([]);
		setIsProcessing(false);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
			<h1 className="text-3xl font-bold mb-6">Memory Game</h1>
			<div className="grid grid-cols-4 gap-4">
				{cards.map((card) => (
					<button
						type="button"
						key={card.id}
						className={`flex items-center justify-center font-bold border-2 rounded cursor-pointer transition-transform
              w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              ${card.isFlipped || card.isMatched ? "bg-white text-black" : "bg-gray-600"}`}
						onClick={() =>
							!card.isFlipped && !card.isMatched && handleCardClick(card.id)
						}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								!card.isFlipped && !card.isMatched && handleCardClick(card.id);
							}
						}}
					>
						{card.isFlipped || card.isMatched ? card.value : "?"}
					</button>
				))}
			</div>
		</div>
	);
};

export default App;
