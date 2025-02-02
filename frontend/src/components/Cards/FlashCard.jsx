import React, { useState } from 'react';
import flashcardBack from '../../assets/Images/landing page/flashcards/flashcard-back.png';
import flashcardFront from '../../assets/Images/landing page/flashcards/flashcard-front.png';

const FlashCard = () => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div className="flashcard-container" onClick={handleFlip}>
			<div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
				{/* Front of the Card */}
				<div
					className="flashcard-front"
					style={{ backgroundImage: `url(${flashcardFront})` }}
				></div>
				{/* Back of the Card */}
				<div
					className="flashcard-back"
					style={{ backgroundImage: `url(${flashcardBack})` }}
				></div>
			</div>
		</div>
	);
};

export default FlashCard;
