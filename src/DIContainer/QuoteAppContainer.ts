// - LoadQuote Service
// Returns: String
// Throws: Error
export const loadQuoteService = async function (): Promise<string> {
  return await _loadQuoteService();
};

export function registerLoadQuoteService(block: () => Promise<string>) {
  _loadQuoteService = block;
}

// Returns: String
// Throws: Error
let _loadQuoteService = async function (): Promise<string> {
  throw Error('Dependency not registered');
};
