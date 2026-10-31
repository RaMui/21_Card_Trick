import random
import time


def create_deck():
    """Create a deck of 21 randomly selected playing cards."""
    suits = ["♠", "♥", "♦", "♣"]
    ranks = [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
    ]
    all_cards = [f"{s}{r}" for s in suits for r in ranks]
    return random.sample(all_cards, 21)


def deal_cards(deck):
    """Deal the 21 cards into three piles."""
    piles = [[], [], []]
    for i, card in enumerate(deck):
        piles[i % 3].append(card)
    return piles


def play_magic():
    print("✨ Welcome to the 21-Card Trick! ✨")
    print("The program will deal 21 cards. Silently remember one of them.\n")
    time.sleep(1)

    deck = create_deck()

    # Play three rounds.
    for round_num in range(1, 4):
        print(f"--- Round {round_num} ---")
        piles = deal_cards(deck)

        # Display the three piles.
        for i in range(3):
            print(f"Pile {i+1}: {' '.join(piles[i])}")

        print()

        # Ask which pile contains the player's chosen card.
        while True:
            try:
                choice = int(
                    input("Which pile contains your card? Enter 1, 2, or 3: ")
                )
                if choice in [1, 2, 3]:
                    break
                print("Invalid choice. Please enter 1, 2, or 3.")
            except ValueError:
                print("Please enter a valid number.")

        # Reassemble the deck with the selected pile in the middle.
        selected_pile = piles[choice - 1]
        other_piles = [piles[i] for i in range(3) if i != (choice - 1)]

        # Order: first other pile + selected pile + second other pile.
        deck = other_piles[0] + selected_pile + other_piles[1]
        print("\nCollecting the cards...\n")
        time.sleep(1)

    # Reveal the card in the middle of the deck (the 11th card, index 10).
    chosen_card = deck[10]

    print("🔮 Working some magic... Get ready for the reveal!")
    time.sleep(2)
    print(f"\n✨ I know your card! It is: [ {chosen_card} ] ✨")
    print("Pretty amazing, right?")


if __name__ == "__main__":
    play_magic()
