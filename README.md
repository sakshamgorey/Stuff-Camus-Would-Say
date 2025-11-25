# Camus Absurdity Generator

> "The struggle itself toward the heights is enough to fill a man's heart. One must imagine Sisyphus happy."

A minimalist, atmospheric web application that generates profound and random quotes from the philosopher Albert Camus using Google's **Gemini API**. The design embraces a "Cinematic Noir" aesthetic, reflecting the existential themes of the absurd, the void, and rebellion.

## ✨ Features

- **AI-Powered Generation**: Utilizes `gemini-2.5-flash` to source accurate quotes from specific works (e.g., *The Stranger*, *The Myth of Sisyphus*, *The Plague*).
- **Atmospheric Design**:
  - **Film Grain Overlay**: Adds tactile texture to the digital void.
  - **Ambient Fog**: CSS animations create a slowly shifting, living background.
  - **Typography**: Uses *Cinzel* for headers and *Lora* for body text to evoke a classic, printed feel.
- **Contextual Intelligence**: Provides the specific source and a brief context tag (e.g., "On Rebellion") for every quote.
- **Minimalist UX**: Simple interactions focused entirely on the text.

## 🛠️ Tech Stack

- **Frontend**: React (v19), TypeScript
- **Styling**: Tailwind CSS
- **AI SDK**: Google GenAI SDK (`@google/genai`)
- **Fonts**: Google Fonts (Cinzel, Lora)

## 🚀 Setup & Installation

### Prerequisites

1.  **Google AI Studio API Key**: You need an API key to access Gemini models. Get one [here](https://aistudio.google.com/).
2.  **Node.js**: Ensure Node.js is installed.

### Environment

The application expects the API key to be available in the environment variables.

```bash
# .env
API_KEY=your_google_ai_studio_api_key
```

### Running Locally

1.  Clone the repository.
2.  Install dependencies (if using a bundler like Vite/Parcel):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## 🎨 Design Philosophy

The UI is built around the concept of "The Void."

1.  **The Background**: Dark Stone colors (#0c0a09) represent the indifferent universe. The moving fog represents the uncertainty of existence.
2.  **The Interaction**: The UI is deliberately slow and rhythmic. Transitions are smoothed out to encourage contemplation rather than rapid consumption.
3.  **The Grain**: A subtle SVG noise filter is applied over the entire viewport to ground the digital experience in something that feels physical and imperfect.

## 📄 License

MIT License.
