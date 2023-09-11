const history = 6;

const adjectiveSets = [
	'Altitude', 'Eco', 'Gaia', 'Glory', 'Grand', 'Iconic', 'Proud', 'Royal', 'Sabai', 'Smart',
	'Lovely', 'Luxury', 'Nice', 'Novel', 'Paradise', 'Prime', 'Private',
	'Reunion', 'Tantra', 'Tropical', 'Windy', 'Zen', 'Nirvana',
	'Emerald', 'Diamond', 'Sapphire', 'Gem',
	'Tamarind', 'Mulberry', 'Blueberry', 'Strawberry', 'Coconut', 'Pine', 'Mango',
	'Sunside', 'Seaside', 'Springs', 'Hillside', 'Riverside', 'Mountainside', 'Hill', 'Valley',
	'Scenery', 'Lakes', 'Beach', 'Hideaway', 'Panorama', 'Island', 'Bay', 'Riviera', 'Peninsula',
	'The Symphony', 'The Privacy', 'Harmonia', 'Sentre', 'Landmark', 'Hamlet', 'Cave',
	'Nice Gem', 'Orchid', 'Lavender', 'Palm', 'Lotus', 'Clouds', 'Linden', 'Rose', 'Tulip', 'Iris', 'Lily',
	'Breeze', 'Mali', 'Bali', 'Santorini', 'Fiji', 'Zanzibar', 'Mauritius', 'Andaman', 'Palau',
	'Mediterranean', 'Azur', 'Golden', 'Red', 'Black', 'Blue', 'Pool', 'Golf Course', 'Golf Club', 'Spa',
];

const nounSet = [
	'Veranda', 'Park', 'Villa', 'Sanctuary', 'Homes', 'Estates', 'Town', 'Residence', 'Boulevard', 'Garden', 'Paragon', 'Maison', 'Resort'
];

const namesSet = [
	'Somchai', 'Somchai', 'Somsak', 'Arthit', 'Kittisak', 'Malee', 'Anong', 'Pornthip', 'Praew'
];


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomCombination() {
	const numWords = getRandomInt(1, 3);
	const usedWords = new Set();
	const generatedWords = [];

	const developmentType = nounSet[getRandomInt(0, nounSet.length - 1)];

	for (let i=0; i<numWords; i++) {
		let adjective;
		do {
			adjective = adjectiveSets[getRandomInt(0, adjectiveSets.length - 1)];
		} while (usedWords.has(adjective));

		usedWords.add(adjective);
		generatedWords.push(adjective);
	}

	if (Math.random() <= 0.2) {
		const randomName = namesSet[getRandomInt(0, namesSet.length - 1)];
		generatedWords.push(developmentType);
		generatedWords.push(`by ${randomName}`);
	} else {
		generatedWords.push(developmentType);
	}

	return generatedWords.join(' ');
}

$(document).ready(function() {
	const generatedNamesContainer = $("#generated-names-container");

	$("#generate-button").click(function() {
		const generatedText = generateRandomCombination();

		const generatedTextContainer = $("<div>").addClass("generated-text-container");
		const generatedTextElement = $("<div>").addClass("generated-text").html(generatedText);

		generatedTextContainer.append(generatedTextElement);
		generatedNamesContainer.prepend(generatedTextContainer);

		if (generatedNamesContainer.children().length > history) {
			generatedNamesContainer.children().last().remove();
		}

		generatedNamesContainer.find(".generated-text-container").each(function(index) {
			const opacity = 1 - (index / history);
			$(this).css("opacity", opacity);

			if (index === 0) {
				$(this).find(".generated-text").css({
					"font-size": "64px",
					"padding-bottom": "64px"
				});
			} else {
				const currentFontSize = 32;
				$(this).find(".generated-text").css({
					"font-size": currentFontSize + "px",
					"padding-bottom": "0px"
				});
			}
		});
	});
});