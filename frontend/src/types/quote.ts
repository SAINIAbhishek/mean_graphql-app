export type Quote = {
  _id: string;
  quote: string;
  author: string;
}

export type QuoteInputData = Omit<Quote, '_id'> & {
  quote: string;
  author: string;
}
