export const loadQuoteService = async function (): Promise<string> {
  return await _loadQuoteService();
};

export function registerLoadQuoteService(block: () => Promise<string>) {
  _loadQuoteService = block;
}

let _loadQuoteService = async function (): Promise<string> {
  throw Error('Dependency not registered');
};
