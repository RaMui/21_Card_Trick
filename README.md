# 21-Card Trick

A Python command-line card trick that appears to identify one of 21 randomly selected playing cards. The player silently remembers a card, then points out its pile in each of three rounds. After collecting each selected pile between the other two piles, the program reveals the 11th card.

## Requirements

- Python 3
- No third-party packages are required.

## Run

```bash
python 21_Card_Trick.py
```

## How to Play

1. Remember one of the 21 cards shown by the program.
2. In each round, enter the number of the pile containing your card: `1`, `2`, or `3`.
3. Repeat for three rounds and let the program reveal your card.

## Project File

- `21_Card_Trick.py` — creates the deck, deals the cards, and reveals the result.

## How It Works

The 21 cards are dealt into three piles. After each round, the selected pile is placed between the other two piles. Repeating this process three times moves the chosen card to the middle of the deck, position 11.

## Reference

[Wikipedia: Twenty-One Card Trick](https://en.wikipedia.org/wiki/Twenty-One_Card_Trick)
