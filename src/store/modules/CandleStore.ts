import Candle from '@/models/Candle'
import axios from 'axios'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

const http = axios.create({
  baseURL: process.env.VUE_APP_CANDLES_API
})

@Module({ name: 'CandleStore' })
export default class CandleStore extends VuexModule {
  private _candles: Candle[] = []
  private _updateFlag = 0;

  get candles() {
    return this._candles.length > 0
      ? this._candles.map(c => {
        return {
          x: c.finalDateTime.toLocaleTimeString(),
          y: [c.open, c.high, c.low, c.close]
        }}) 
      : []
  }

  get updateFlag() {
    return this._updateFlag;
  }

  @Action
  async loadInitialCandles() {
    try {
      const results = await http.get(`candles/40`)
      const candlesObj = results.data
      const candles: Candle[] = candlesObj.map((c: any) => new Candle(c))
      
      this.context.commit('_initializeCandles', candles.reverse())
    } catch (error) {
      console.log(error)      
    }
  }

  @Action
  addCandle(candle: Candle) {
    this.context.commit('_appendNewCandle', candle)
  }

  @Mutation
  private _initializeCandles(candles: Candle[]) {
    this._candles = candles
  }

  @Mutation
  private _appendNewCandle(candle: Candle) {
    this._candles.push(candle);
    this._updateFlag++;
  }
}