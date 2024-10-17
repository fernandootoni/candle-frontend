<template>
  <div class="page">
    <Header></Header>

    <div class="container">
      <CandleStickChart 
        v-if="allCandles?.length > 0" 
        :candles="allCandles"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import Header from './components/Header.vue';
import { getModule } from 'vuex-module-decorators';
import { useStore } from 'vuex';
import CandleStore from './store/modules/CandleStore';
import CandleStickChart from './components/CandleStickChart.vue';
import { io, Socket } from 'socket.io-client';
import Candle from './models/Candle';
import { clearToasts, createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    CandleStickChart
  },
  setup() {
    const store = useStore(); 
    const candleStore = getModule(CandleStore, store); 
    const allCandles = ref<any[]>([]);
    const socket = io(process.env.VUE_APP_SOCKET_SERVER)

    onMounted(async () => {
      await candleStore.loadInitialCandles();
      allCandles.value = [...candleStore.candles];

      socket.on(process.env.VUE_APP_SOCKET_EVENT_NAME!, (msg) => {
        const candle = new Candle(msg)
        candleStore.addCandle(candle)
        createToast('New candle arrived!', { type: 'info', onClose: () => clearToasts() })
        allCandles.value = [...candleStore.candles];
      })
    })

    return {
      allCandles
    };
  }
});
</script> 


<style>
.page {
  background-color: rgb(211, 211, 211);
  height: 100vh;
}
.container {
  width: 80vw;
  margin: auto;
  margin-top: 4rem;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}
</style>