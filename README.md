# AI Weather and Knowledge Chatbot

A full-stack conversational AI application that combines weather assistance and general knowledge question answering through a graph-based agent architecture.

The project uses Cohere LLMs with LangGraph orchestration, a FastAPI backend, a React + TailwindCSS frontend, and persistent chat storage using SQLAlchemy with a relational database.

---

# Features

- Conversational AI chatbot
- Weather-related assistance
- General knowledge responses
- Context-aware conversations
- Persistent chat history
- User login system
- Graph-based agent workflow
- FastAPI REST backend
- React frontend with TailwindCSS
- SQLAlchemy ORM integration

---

# Tech Stack

## Frontend

- React
- Vite
- TailwindCSS
- React Router

## Backend

- FastAPI
- LangGraph
- LangChain
- Cohere API
- SQLAlchemy
- Pydantic

## Database

The project uses SQLAlchemy as the ORM layer.

It can work with:
- SQLite (development)
- PostgreSQL
- MySQL

The current local setup uses a relational SQL database through SQLAlchemy.

---

# Architecture Overview

The backend agent is implemented using LangGraph and works as a state machine.

Main workflow:

1. User message enters the system
2. Query classification
3. Route to:
   - Weather workflow
   - General knowledge workflow
   - Conversational follow-up workflow
4. Context-aware response generation
5. Chat persistence in database

The agent maintains:
- Message history
- Topic classification
- Weather data state

---

# Agent Design

The chatbot uses a custom LangGraph state structure.

Example state:

```python
class AgentState(TypedDict):
    messages: List[BaseMessage]
    topic: Optional[str]
    weather_data: Optional[List[WeatherData]]
```

The graph includes:
- Query classification
- Conditional routing
- API interaction nodes
- Conversational context nodes

---

# Authentication

A simple login system is implemented using usernames.

Users can:
- Create accounts
- Start multiple chats
- Persist chat history

---

# Database Design

Main entities:

## User
Stores registered users.

## Chat
Represents a conversation session.

## ChatMessage
Stores individual messages with roles:
- user
- ai
- system

---

# API Endpoints

## Users

- Create user
- Login user

## Chats

- Create chat
- Send message
- Retrieve chat history
- Retrieve user chats

---

# Frontend

The frontend is built using React and TailwindCSS.

Main pages:
- Login page
- Chat list page
- Chat conversation page

---

# Running the Project

## Backend

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn app.main:app --reload
```

---

## Frontend

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

# Environment Variables

Example `.env`:

```env
COHERE_KEY=your_api_key
DATABASE_URL=your_database_url
```

---

# Future Improvements

- Streaming responses
- Better memory handling
- Tool calling
- Vector database integration
- Retrieval-Augmented Generation (RAG)
- Authentication with JWT
- Docker deployment
- WebSocket chat updates

---

# Notes

This project was developed as an exploration of modern AI application architecture using:
- graph-based orchestration
- conversational state management
- persistent chat memory
- full-stack integration
