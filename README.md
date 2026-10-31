# 21-Card Trick

[**Play the 21-Card Trick**](https://ramui.github.io/21_Card_Trick/)

A browser-based card trick that appears to identify one of 21 randomly selected playing cards. The player silently remembers a card, then points out its pile in each of three rounds. After collecting each selected pile between the other two piles, the program reveals the 11th card.

## Browser Version

Open `h5/index.html` in a modern browser to play the responsive H5 version. It uses vanilla JavaScript and inline SVG card faces, with no build step or external dependencies.

The core card-trick logic is based on the `python_version` branch; this version adds a front-end interface to demonstrate the trick in the browser.

## How to Play

1. Remember one of the 21 cards shown by the program.
2. In each round, enter the number of the pile containing your card: `1`, `2`, or `3`.
3. Repeat for three rounds and let the program reveal your card.

## Project File

- `h5/` — browser version of the trick (`index.html`, `styles.css`, and `app.js`).

## How It Works

The 21 cards are dealt into three piles. After each round, the selected pile is placed between the other two piles. Repeating this process three times moves the chosen card to the middle of the deck, position 11.

## Reference

[Wikipedia: Twenty-One Card Trick](https://en.wikipedia.org/wiki/Twenty-One_Card_Trick)

