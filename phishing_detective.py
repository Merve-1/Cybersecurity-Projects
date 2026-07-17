import json
import random
import sys


def load_messages(filename="messages.json"):
    try:
        with open(filename, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data["messages"]
    except FileNotFoundError:
        print(f"Could not find '{filename}'. Make sure it's in the same folder as this script.")
        sys.exit(1)
    except (json.JSONDecodeError, KeyError):
        print(f"'{filename}' isn't formatted correctly. Check the JSON syntax.")
        sys.exit(1)


def play_game():
    print("=" * 60)
    print("🕵️  PHISHING DETECTIVE — Is it Safe or Phishing?")
    print("=" * 60)

    questions = load_messages()
    random.shuffle(questions)
    score = 0

    for i, msg in enumerate(questions, start=1):
        print(f"\nMessage {i}/{len(questions)}:")
        print(f'  "{msg["text"]}"')
        guess = input("\nYour answer (safe / phishing): ").strip().lower()

        correct = guess == msg["answer"]
        if correct:
            score += 1
            print("✅ Correct!")
        else:
            print(f"❌ Not quite,  this one is: {msg['answer'].upper()}")

        print(f"💡 Why: {msg['why']}")

    print("\n" + "=" * 60)
    print(f"FINAL SCORE: {score}/{len(questions)}")
    if score == len(questions):
        print("🏆 Perfect! You're officially a Phishing Detective!")
    elif score >= len(questions) * 0.7:
        print("🎯 Great job! You caught most of the fakes.")
    else:
        print("📚 Good start, review the red flags and try again!")
    print("=" * 60)


if __name__ == "__main__":
    play_game()