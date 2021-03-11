export default interface ICryptoRates {
  rateInUSD: (token: string[]) => Promise<any>;
}
