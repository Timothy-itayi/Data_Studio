# 🎯 Data Studio Lite: Sports Odds API

> 🏈 A backend-only app that fetches **live and upcoming games** with real-time **sports odds**, filters by region and market, and allows users to **lock and store picks**. Designed for dev-mode API craftsmanship and clean backend architecture. (≧◡≦)

---

## 📦 What This Project Does

- ⚡️ Fetches real-time **sports game data** with odds via RapidAPI
- 🔍 Filters by **region** (e.g., US) and **markets** (e.g., h2h, spreads)
- 🔐 Stores **user "locks"** (picks) for tracking betting performance
- 🧠 Extensible for odds stats, user dashboards, or AI-powered predictions later!

---

## 🧪 Current API Endpoints

| Method | Route          | Description |
|--------|----------------|-------------|
| `GET`  | `/games`       | Fetch upcoming games with odds |
| `POST` | `/locks`       | Save a user's pick (lock) |
| `GET`  | `/locks/:id`   | Retrieve a specific lock |
| `GET`  | `/locks`       | Retrieve all locks |

---

## 🌍 Sample API Usage

```bash
GET /games?region=us&markets=h2h,spreads
```

Returns:
```json
[
  {
    "id": "abc123",
    "sport_title": "NFL",
    "home_team": "Houston Texans",
    "away_team": "Kansas City Chiefs",
    "bookmakers": [
      {
        "title": "DraftKings",
        "markets": [
          {
            "key": "h2h",
            "outcomes": [
              { "label": "Houston Texans", "price": 2.23 }
            ]
          }
        ]
      }
    ]
  }
]
```

## 🛠️ Tech Stack
- 🌐 Node.js + Express
- 🔗 RapidAPI Sports Odds
- 📁 JSON dataset support (in dev mode)
- 💾 Storage solution (TBD - evaluating options)
- 🧪 Dev-mode only (no production deployment planned)

## 🎯 Project Vision
Help developers or analysts explore niche datasets (in this case, sports data) via well-designed backend APIs. Simple, effective, and built with production-quality patterns — but dev-only. (＾▽＾)

## 📌 Future Ideas
- 🧠 AI integration to analyze pick trends
- 📊 /stats endpoint for grouped insights
- 🔄 Webhook support for odds refresh
- 🎲 Pick validation to prevent duplicate bets
- 📱 Mobile-friendly dashboard UI

## 🚧 Development Status
🧪 In active development. This project is a backend design showcase and will remain in dev mode. Production efforts will shift to a full-stack version later. (ง'̀-'́)ง