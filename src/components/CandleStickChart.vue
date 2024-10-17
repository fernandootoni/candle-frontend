<template>
  <ApexChart
    type="candlestick"
    height="350"
    :options="chartOptions"
    :series="[{ data: candles }]"
  ></ApexChart>

</template>

<script lang="ts">
import { defineComponent, Prop, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  name: 'CandleStickChart',
  components: {
    ApexChart: VueApexCharts
  },
  props: {
    candles: {
      type: Array,
      required: true
    }
  },
  watch: {
    candles: {
      handler() {
        // Força a atualização do gráfico quando a prop `candles` muda
        this.$forceUpdate();
      },
      deep: true
    }
  },
  setup(props) {
    const chartOptions = {
      chart: {
        id: 'candlestick',
        height: 350
      },
      title: {
        text: 'Bitcoin last prices'
      },
      xaxis: {
        categories: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };

    const chartRef = ref<any>(null);

    // Watch para detectar mudanças nas candles
    watch(() => props.candles, (newCandles) => {
      if (chartRef.value) {
        chartRef.value.updateSeries([{
          data: newCandles
        }]);
      }
    });

    const series = [{
      data: props.candles
    }];

    return {
      chartOptions,
      chartRef
    };
  }
});
</script>


<style>

</style>