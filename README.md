# 🧠 Data Studio Lite 

*( ˘ω˘ )✧ Backend API meets AI insight.*

---

## 🎯 Project Overview

**Data Studio Lite** is a minimalist backend app that ingests preloaded datasets and exposes them through clean, queryable API endpoints. It also integrates a lightweight local AI model to analyze and summarize dataset content on demand. Perfect for showcasing backend craftsmanship + data intuition!

---

## 💡 Why?

(；・∀・) “Why is working with public data such a pain!?”

Because it’s messy, unstructured, and inconsistent.  
**This app fixes that by doing the hard work upfront**, providing:

- Filterable, sortable, and paginated REST endpoints
- Pre-cleaned datasets ready to use
- An AI interface for asking questions and getting summaries

---

## 🛠️ Core Features

| Feature | Description |
|--------|-------------|
| `/data` | Get filtered records from a selected dataset |
| `/stats` | Grouped stats (e.g. counts, averages by category) |
| `/analyze` | Ask the AI to describe the dataset or answer natural language questions |
| `/metadata` | Get available dataset info and schema hints |

---

## 🔧 Tech Stack

- **Node.js + Express** – API server
- **JavaScript (Vanilla)** – Frontend
- **HTML/CSS** – UI shell
- **Python (`llama-cpp-python`)** – Embedded local LLM
- **CSV / JSON** – Input format for datasets
- **EC2 or Docker** – Deployment target

---

## 🤖 AI Integration

(＾• ω •＾) The app includes a lightweight AI engine to:

- Summarize the structure of a dataset
- Suggest meaningful queries
- Answer user questions in natural language

Powered by open-source models like **LLaMA** or **Mistral**, run locally via `llama-cpp`.

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourname/Data_Studio.git
cd Data_Studio
npm install        # Set up backend
pip install llama-cpp-python  # (In a Python venv)

node server/index.js 
