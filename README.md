# 🕵️ Phishing Detective

A simple terminal game that teaches you how to spot phishing messages.
Built for the "Introduction to Cyber Security" session, no coding
experience needed to play, and no external libraries needed to run.

## What it does

You're shown a message. You guess whether it's **safe** or **phishing**.
Then you instantly see the correct answer and *why*,  what red flags
gave it away (or why it was fine). At the end, you get a score.

## Files

| File | Purpose |
|---|---|
| `phishing_detective.py` | The game itself |
| `messages.json` | The list of messages the game uses |

Both files must be in the **same folder**.

## How to run it

You need Python 3 installed (no other setup required).

```bash
python3 phishing_detective.py
```

Then just type `safe` or `phishing` when prompted, and press Enter.

## Adding your own messages

Open `messages.json` in any text editor and add a new entry in the
same format:

```json
{
  "text": "Your fake or real message here",
  "answer": "safe",
  "why": "A short explanation of why it's safe or phishing"
}
```

- `answer` must be exactly `"safe"` or `"phishing"` (lowercase).
- Don't forget the comma between entries.

## Example round

```
Message 1/7:
  "🎁 Congrats! You've won a free gift card. Click here and enter
   your account password to claim it within 10 minutes!"

Your answer (safe / phishing): phishing
✅ Correct!
💡 Why: Free prize + urgency ('10 minutes') + asks for your password
   directly. Classic phishing pattern.
```
