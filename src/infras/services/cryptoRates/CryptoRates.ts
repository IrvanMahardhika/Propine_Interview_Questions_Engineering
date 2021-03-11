import axios from 'axios';
import ICryptoRates from '@core/services/cryptoRates/ICryptoRates';

export default class CryptoRates implements ICryptoRates {
  async rateInUSD(tokens: string[]): Promise<any> {
    const options = {
      headers: {
        authorization: process.env.CRYPTO_COMPARE_API_KEY,
      },
    };
    const tokensString = tokens.join(',');
    const { data } = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tokensString}&tsyms=USD`,
      options,
    );
    return data;
  }
}
