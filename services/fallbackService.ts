import { CamusQuote } from "../types";

// Raw CSV Data
// Format: "Quote Text","Source","Context"
const FALLBACK_CSV = `
"The struggle itself toward the heights is enough to fill a man's heart. One must imagine Sisyphus happy.","The Myth of Sisyphus","On Happiness"
"In the depth of winter, I finally learned that within me there lay an invincible summer.","Return to Tipasa","On Resilience"
"Man is the only creature who refuses to be what he is.","The Rebel","On Human Nature"
"Nobody realizes that some people expend tremendous energy merely to be normal.","Notebooks","On Alienation"
"I rebel; therefore we exist.","The Rebel","On Rebellion"
"Freedom is nothing but a chance to be better.","Resistance, Rebellion, and Death","On Freedom"
"The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.","The Rebel","On Freedom"
"Fiction is the lie through which we tell the truth.","Notebooks","On Art"
"Real generosity toward the future lies in giving all to the present.","The Rebel","On Time"
"To be happy, we must not be too concerned with others.","Notebooks","On Happiness"
`;

/**
 * Parses a specific CSV format where every field is enclosed in double quotes.
 */
function parseCSV(csv: string): CamusQuote[] {
  const lines = csv.trim().split('\n');
  const quotes: CamusQuote[] = [];

  for (const line of lines) {
    // Regex to match content inside quotes: "Content 1","Content 2","Content 3"
    const matches = line.match(/"([^"]*)"/g);
    
    if (matches && matches.length >= 2) {
      // Remove the surrounding quotes from the matches
      const cleanData = matches.map(m => m.slice(1, -1));
      
      quotes.push({
        text: cleanData[0],
        source: cleanData[1],
        context: cleanData[2] || 'Existentialism'
      });
    }
  }
  
  return quotes;
}

export const getFallbackQuote = (): CamusQuote => {
  const quotes = parseCSV(FALLBACK_CSV);
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};
