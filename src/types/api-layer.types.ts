export interface CurrencyResponse {
  date: string;
  historical: string;
  info: {
    rate: number;
    timestamp: number;
  };
  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
  success: boolean;
  error?: {
    code: number;
    info: string;
    type: string;
  };
}
