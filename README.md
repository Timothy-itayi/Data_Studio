# Data_Studio
S3
# 🧪📊 Data Studio Lite 

(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ A lightweight backend microservice for data lovers and tinkerers!  
Ingest messy public datasets → Clean them → Expose powerful APIs → Generate beautiful PDF reports.  
Your portable API for exploring the world through data. 🚀

---

## 🌟 Project Goals

(`･ω･´)ゞ Prove backend craftsmanship with a real-world data flow:
- Ingest messy **CSV/JSON datasets**
- Clean + normalize into **DynamoDB**
- Expose a robust, queryable **REST API**
- Export filtered data into **PDF reports** 🖨️

---
## 🎯 Use Case

Imagine uploading a dataset of Formula 1 results...  
Then calling:

GET /data?season=2023&podium=true
GET /report?season=2023&podium=true



And receiving:
- 📄 A clean JSON response of all podium finishers
- 📄 A beautifully formatted PDF report of the same data, ready to share

ヽ(・∀・)ﾉ✨✨✨

---

## 🧩 Core Features

| Feature | Description |
|--------|-------------|
| 📂 Dataset Upload | Upload CSV/JSON files via HTML form or API (S3-backed) |
| ⚙️ Lambda Ingestion | AWS Lambda cleans and stores data in DynamoDB |
| 🔍 Query API (`/data`) | Filter, sort, paginate dataset results |
| 📊 Stats API (`/stats`) | Grouped stats and aggregations |
| 🖨️ PDF Report API (`/report`) | Export filtered results to PDF |
| 🧾 Logs | Log query metadata for insights and performance tuning |

---

## 🛠️ Tech Stack

- ☁️ **AWS S3** — store raw datasets
- ⚡ **AWS Lambda** — ingest and clean data
- 🗃️ **DynamoDB** — fast and flexible data storage
- 🌐 **Node.js + Express** — REST API
- 📄 **pdfmake** / **puppeteer** — PDF report generation
- 💻 **HTML + JavaScript** — for simple upload frontend

---

## 🚧 Roadmap (Shape Up Method)

**Appetite**: 6 weeks  
**Core Slice**:
- [x] Upload 1 public dataset
- [x] Clean + store in DynamoDB
- [x] Query via `/data` with filters/sort/pagination
- [x] Export results to PDF via `/report`

**Nice-to-Haves** (Scope Hammered 🧠🔨):
- [ ] Multiple datasets
- [ ] Swagger/OpenAPI docs
- [ ] Stats endpoint (`/stats`)
- [ ] Visual dashboard integration

---

## 🧪 Example Dataset Ideas

- 🏎️ Formula 1 race results  
- ☕ Global coffee shop locations  
- 🌏 Earthquake data from USGS  
- 🚌 Public transit stops  
- 🎶 Billboard music charts  

ヽ(•‿•)ノ Pick one and explore!

---



## ✨ Credits

Built with ☕, curiosity, and backend love by [Timothy_Itayi] (｡♥‿♥｡)

---

## 🏁 Let’s Go!

Upload your dataset
Watch it get cleaned
Query and export it like a pro!

(っ＾▿＾)۶🍸🌟🍺٩(˘◡˘ )
