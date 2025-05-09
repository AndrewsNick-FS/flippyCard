# 📝 Full Sail University - Card Match

### 🔗 https://card-match-game-fso.netlify.app/

In this week's activity, you are tasked with building a new HTML/TypeScript/SASS browser game.

### ⚙️ Overview

The objective of the game is to find all sets of matching cards within a maximum of 3 tries/attempts. There will be a total of six (6) cards flipped face down at the start. The set will include 3 pairs of matching cards. The player must try to match all three pairs of cards in fewer than 3 attempts. An attempt doesn't represent just one card flip; rather, it involves comparing 2 cards in one try. If the cards don't match, they are flipped back to their face-down state, and the player's remaining attempts are reduced by one.

At the start of each new game, the cards must reshuffle to different positions and values. Note that you do not need to include special cards like Jacks, Queens, Kings, or Aces. Whether or not to include them is up to you; it will not earn you any extra points, however it could be a fun challenge if you're feeling adventurous.

# 🎨 The Design

You do not need to create a custom design for this activity, but you are welcome to alter the design's colors, layout, and more. You may also create an entirely new design if you'd like. If you choose to use the design provided below, it includes assets such as background images and colors. Your task is to write the HTML/TypeScript/SCSS for this design from scratch. 

## 📋 References

![Screenshot 2024-12-05 080729](https://github.com/user-attachments/assets/041afcb1-d1be-4091-82fb-a6b8d9d883d2)

# 🔗 npm - Dependencies

- npm install --save-dev typescript ts-loader
- npm install sass-loader node-sass
- npm install --save-dev webpack
- npm i sass
- npm i typescript
- npm i css-loader
- npm i html-webpack-plugin
- npm i babel-loader
- npm install --save-dev webpack webpack-cli copy-webpack-plugin _(copy assets to output dir)_

# 📈🪶 Progress Screenshots/Code
### _This section will have all the screenshots & code for my updated progress while developing..._

## 🛠️ Setup 

![Screenshot 2024-12-05 094446](https://github.com/user-attachments/assets/6ccf7a4d-6529-4395-82a2-d971f3347f8e)

```javascript
plugins: [ // updated plugins to include CopyWebpackPlugin for assets folder _outside_ src dir
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets'), // folder for assets to copy
          to: path.resolve(__dirname, 'dist/assets'), // where to input the copied folder
        },
      ],
    }),
  ],
```

### ╰┈➤ Deploy to Netlify (**_On Github Push_**)

![Screenshot 2024-12-05 102507](https://github.com/user-attachments/assets/191f15b6-5509-4dc3-b056-c8e18c6accab)

## 📘 Frontend

![Screenshot 2024-12-06 083728](https://github.com/user-attachments/assets/04893251-073f-468f-a253-7e6035726c7d)

![Screenshot 2024-12-07 154733](https://github.com/user-attachments/assets/16453e07-faf3-46cb-80fc-5f07db708cb1)

![Screenshot 2024-12-08 080628](https://github.com/user-attachments/assets/d5f42862-2b79-481e-982e-ab54414f8458)

### The Problem & The Solution
Put my front facing card into Photoshop, and put some round edges on the card; had little spacing with a transparent background for visual border radius. 
![Screenshot-2024-12-08-080628](https://github.com/user-attachments/assets/f00b1451-1d39-49d1-a5cb-80cd7fdd9fe1)

### Added media queries to make it more mobile friendly...
![Screenshot 2024-12-08 191924](https://github.com/user-attachments/assets/bc864d64-8f7c-4163-b26d-d1f682a9fdf3)




## 📖 Backend

### Using interface options an array of objects with TS to define and output type based on card click and index of array.
![Screenshot 2024-12-07 190836](https://github.com/user-attachments/assets/ddfce91a-2ac7-4eef-a5cb-448c5578d0e6)

### Code _(TS)_
```javascript
interface MatchOptions { // inferance objects are in CAPS >>> optional sets will end with "?" ex: type: "a" | type?: "b"
    type: "a" | "b" | "c"; // only options for the card types
}

const randomizeCard = (opts: MatchOptions[]) => {
    console.log(cardTypes[0].type); // output "a"

    const allCards: NodeListOf<Element> = document.querySelectorAll('.card');
    // console.log(allCards)
    allCards.forEach(card => {
        card.addEventListener('click', () => {
            let getIdAttr: any = card.getAttribute('id');
            console.log(getIdAttr)
            card.textContent = cardTypes[0].type; // this is how we get the card and into the correct (RANDOM) letter 
        });
    })
}

const cardTypes: MatchOptions[] = [ // array of objects within a stored variable
    {type: "a" },
    {type: "a" },
    {type: "b" },
    {type: "b" },
    {type: "c" },
    {type: "c" },
    // {type: "d" }, >>> this does NOT work, its not in the options
]

randomizeCard(cardTypes); // functions expects 1, put array of objects inside variables to call function and use within
```

### Got card value, & the selected card; stored data, ready for SCSS & randomizing cards on load...
![Screenshot 2024-12-07 195433](https://github.com/user-attachments/assets/9a837a1c-8b9b-4854-a1a5-68c1ea787e22)

### Code _(TS)_
```javascript
interface MatchOptions { // inferance objects are in CAPS >>> optional sets will end with "?" ex: type: "a" | type?: "b"
    type: "A" | "B" | "C"; // only options for the card types
}

const randomizeCard = (opts: MatchOptions[]) => {
    console.log(cardTypes[0].type); // output "a"
    console.log(cardTypes, "array of objects for card types");

    const allCards: NodeListOf<Element> = document.querySelectorAll('.card');
    // console.log(allCards)
    allCards.forEach(card => {
        card.ariaValueText = cardTypes[0].type; // append values types "A, B, C" to the cards
        card.textContent = card.ariaValueText;
        card.addEventListener('click', () => {
            let getIdAttr: string | null = card.getAttribute('id');
            let getCardValue: any = card.ariaValueText;
            // console.log(getIdAttr)
            alert(`The value of that card is ${getCardValue} and you clicked on the ${getIdAttr} card.`);
            console.log(`The value of that card is ${getCardValue} and you clicked on the ${getIdAttr} card.`);
        });
    })
}

const cardTypes: MatchOptions[] = [ // array of objects within a stored variable
    {type: "A" },
    {type: "A" },
    {type: "B" },
    {type: "B" },
    {type: "C" },
    {type: "C" },
    // {type: "d" }, >>> this does NOT work, its not in the options
]

randomizeCard(cardTypes); // functions expects 1, put array of objects inside variables to call function and use within
```
### Added state management to tell when user has picked TWO cards, now ready to compare values... 
![Screenshot 2024-12-07 212147](https://github.com/user-attachments/assets/3686d577-8a52-42f0-8cb7-1d6cddd66d81)

### Code _(TS)_
```javascript 
let pickTwo: number = 0; // state management 
let pickedTwo: boolean = false; // state management 

if (pickTwo === 2) { // match or not, on another click, reset
    pickTwo = 1;
    pickedTwo = false;
} else if (pickTwo === 1) { // second pick
    pickTwo = 2;
    pickedTwo = true;
} else if (pickTwo === 0 && !pickedTwo) { // first pick
    pickTwo = 1;
}
```

### Shuffled the array of values, on load, assign the shuffed values into aria-valuetext values of each card, on click, change text content to aria-valuetext attribute
![Screenshot 2024-12-08 111258](https://github.com/user-attachments/assets/10ec69f1-9a2e-4009-b231-2ed03937689e)

### Code _(TS - Current Codebase)_
```javascript
/* REFS >>> 
    1) https://webpack.js.org/guides/typescript/
    2) https://stackoverflow.com/questions/45780272/how-to-define-an-array-of-strings-in-typescript-interface
    3) https://www.typescriptlang.org/docs/
    4) https://www.typescriptlang.org/docs/handbook/ >>> THE HOLY BIBLE OF TYPESCRIPT <<<
    5) https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
    6) https://stackoverflow.com/questions/29043135/javascript-one-line-if-else-else-if-statement
    7) https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
*/

const allCards: NodeListOf<Element> = document.querySelectorAll('.card');
const oneCard = document.querySelector('.card');
let pickTwo: number = 0; // state management 
let pickedTwo: boolean = false; // state management 


interface MatchOptions { // inferance objects are in CAPS >>> optional sets will end with "?" ex: type: "a" | type?: "b"
    type: "A" | "B" | "C"; // only options for the card types
}

const shuffleCards = (opts: MatchOptions[]) => {
    let currentIndex = opts.length; // increment 

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [opts[currentIndex], opts[randomIndex]] = [
            opts[randomIndex], opts[currentIndex]
        ];

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [opts[currentIndex], opts[randomIndex]] = [
                opts[randomIndex], opts[currentIndex]
            ];
        }
        console.log(cardTypes, "Shuffled, Ready for Use")

        return opts;
    }
}

allCards.forEach(card => { // add event listener for cards
    card.addEventListener('click', () => {
        card.textContent = card.ariaValueText;

        if (pickTwo === 2) { // match or not, on another click, reset
            pickTwo = 1;
            pickedTwo = false;
        } else if (pickTwo === 1) { // second pick
            pickTwo = 2;
            pickedTwo = true;
        } else if (pickTwo === 0 && !pickedTwo) { // first pick
            pickTwo = 1;
        }


        // pickTwo = 1; 
        console.log(`${pickTwo} of 2 picked.`);
        console.log("Done picking cards:", pickedTwo);
        let getIdAttr: string | null = card.getAttribute('id');
        let getCardValue: any = card.ariaValueText;
        showCard(`${getIdAttr}`);
        // console.log(getIdAttr)
        // alert(`Card number ${getIdAttr} of ${allCards.length}. You picked ${getCardValue}!`);
        console.log(`Card number ${getIdAttr} of 6. You picked ${getCardValue}!
            -------------------`);
    });
})

const compareMatch = (first: string, second: string) => {
    // compare the two picks
} 

const showCard = (id: string) => {
    let card = document.getElementById(`${id}`);
    console.log('SCSS Applied to card: ', card?.id);
    card?.setAttribute("style", "background-image: url('/assets/images/card-flip-front.png');");
} 

const cardTypes: MatchOptions[] = [ // array of objects within a stored variable
    {type: "A" },
    {type: "A" },
    {type: "B" },
    {type: "B" },
    {type: "C" },
    {type: "C" },
    // {type: "d" }, >>> this does NOT work, its not in the options
]

shuffleCards(cardTypes); // functions expects 1, put array of objects inside variables to call function and use within
// console.log(cardTypes)

const appendValuesGenerated = () => {
    let i = 0;
    allCards.forEach(card => {
        console.log(card, `${cardTypes[i].type}`);
        card.ariaValueText = cardTypes[i].type;
        i++;
    });
}

appendValuesGenerated(); // append the avlues shuffled
```

### Backend Complete

![Screenshot 2024-12-08 190709](https://github.com/user-attachments/assets/7cf2be54-934e-4e7f-9750-005bb3d7e54e)

### Code _(TS - Main Logic)_
```javascript
allCards.forEach(card => { // add event listener for cards
    card.addEventListener('click', () => {
        if (preventUserInput) return; // stop user input if keep clickin

        let resultsText = document.getElementById('footer-results-text') as HTMLFormElement; 
        card.textContent = card.ariaValueText;

        let getIdAttr: string | null = card.getAttribute('id');
        let getCardValue: any = card.ariaValueText;
        showCard(`${getIdAttr}`);
        console.log(`Card number ${getIdAttr} of 6. You picked ${getCardValue}!
            -------------------`);

        if (pickTwo === 0) { // first pick
            if (!card.classList.contains('matched')) { // to see if its already match, A.K.A. Don't allow user to try to match ALREADY matched cards
                firstPick = card.ariaValueText;
                card.classList.add('flipped'); // add flip class
                console.log('Your First Pick: ', firstPick);
                pickTwo = 1; // move to the second pick
            }
        } else if (pickTwo === 1) { // second pick
            if (!card.classList.contains('matched')) { // same thing, error handling for matching
                    secondPick = card.ariaValueText;
                    card.classList.add('flipped');
                    console.log('Your Second Pick: ', secondPick);

                    preventUserInput = true;
                }
            if (firstPick === secondPick) {
                console.log('Match found!'); // if match found >>> keep cards flipped, add matched class
                resultsText.textContent = 'Match found!';
                document
                    .querySelectorAll('.flipped:not(.matched)')
                    .forEach(card => card.classList.add('matched')); // add the class matched to ALL cards that don't have it
            } else { // no match found!
                attemptsLeft--; // minus one from attempts on match NOT found
                attempts.textContent = `Attempts Left: ${attemptsLeft}`;
                console.log('No match.');
                resultsText.textContent = 'Try again!'; 
                setTimeout(() => { // flip cards back after a short delay
                    document
                        .querySelectorAll('.flipped:not(.matched)')
                        .forEach(card => {
                            card.textContent = '?'; // reset card
                            card.classList.remove('flipped');
                            card.setAttribute("style", "background-image: url('/assets/images/card-flip-back.png');");
                        });
                }, 1000); // 1s delay
            }

            let howMany = 0;
            setTimeout(() => { // after second pick, match or no match logic goes off,  reset for next turn next turn
                firstPick = null;
                secondPick = null;
                preventUserInput = false;
                pickTwo = 0;
                console.log('Ready for the next turn.');
                resultsText.textContent = 'Try to Match!';
                allCards.forEach(card => {
                    if (card.classList.contains('matched')) {
                        howMany += 1; 
                        console.log(howMany);
                    }
                })
                
                if (howMany === 6) { // win
                    resultsText.textContent = 'You Won!';

                    setTimeout(() => { 
                        location.reload();
                    }, 500);

                    alert('You Won!')
                } else if (attemptsLeft === 0) { // lose
                    resultsText.textContent = 'Sorry! Game Over!';

                    setTimeout(() => { 
                        location.reload();
                    }, 500);

                    alert('Sorry! Game Over!')
                }
            }, 1000);
        }
    });
})
```