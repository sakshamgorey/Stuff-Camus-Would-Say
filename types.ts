export interface CamusQuote {
  text: string;
  source: string;
  context?: string;
}

export interface GenerationState {
  quote: CamusQuote | null;
  isLoading: boolean;
  error: string | null;
}