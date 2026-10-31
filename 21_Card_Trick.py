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
    print("✨ 歡迎來到 21 張牌魔法秀！ ✨")
    print("程式將隨機發出 21 張牌，請在心中記住其中一張牌。\n")
    time.sleep(1)

    deck = create_deck()

    # Play three rounds.
    for round_num in range(1, 4):
        print(f"--- 第 {round_num} 輪發牌 ---")
        piles = deal_cards(deck)

        # Display the three piles.
        for i in range(3):
            print(f"第 {i+1} 堆: {' '.join(piles[i])}")

        print()

        # Ask which pile contains the player's chosen card.
        while True:
            try:
                choice = int(
                    input("請輸入你選的牌在哪一堆（輸入 1、2 或 3）: ")
                )
                if choice in [1, 2, 3]:
                    break
                print("輸入錯誤，請輸入 1、2 或 3。")
            except ValueError:
                print("請輸入有效的數字！")

        # Reassemble the deck with the selected pile in the middle.
        selected_pile = piles[choice - 1]
        other_piles = [piles[i] for i in range(3) if i != (choice - 1)]

        # Order: first other pile + selected pile + second other pile.
        deck = other_piles[0] + selected_pile + other_piles[1]
        print("\n正在收牌中...\n")
        time.sleep(1)

    # Reveal the card in the middle of the deck (the 11th card, index 10).
    chosen_card = deck[10]

    print("🔮 魔法運算中，見證奇蹟的時刻到了...")
    time.sleep(2)
    print(f"\n✨ 我知道了！你心裡選的那張牌就是：【 {chosen_card} 】 ✨")
    print("是不是很神奇呢？")


if __name__ == "__main__":
    play_magic()
