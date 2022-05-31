<template>
  <div class="circle-loader">
    <svg class="svg-wrapper" :height="`${size}`" :width="`${size}`">
      <circle
        class="stroke"
        :style="[dashArray, circumference, dashOffset]"
        :stroke-width="strokeWidth"
        :stroke="strokeColor"
        :cx="radius"
        :cy="radius"
        :r="strokeRadius"
        fill="none"
      ></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  props: {
    size: {
      type: Number,
      required: true,
    },
    strokeGap: {
      type: Number,
      required: true,
    },
    strokeColor: {
      type: String,
      required: true,
    },
    strokeWidth: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const radius = computed(() => props.size / 2);
    const strokeRadius = computed(() => radius.value - props.strokeGap);
    const circumference = computed(() => ({
      "--circumreference": 2 * 3.14 * strokeRadius.value,
    }));
    const dashArray = computed(() => ({
      "--dashArray": 3.14 * strokeRadius.value,
    }));
    const dashOffset = computed(() => ({
      "--dashOffset": 2 * 3.14 * strokeRadius.value,
    }));

    return {
      radius,
      strokeRadius,
      circumference,
      dashArray,
      dashOffset,
    };
  },
});
</script>

<style lang="scss" scoped>
.circle-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stroke {
  display: flex;
  align-items: center;
  justify-content: center;

  animation: fill-animation 1.5s cubic-bezier(1, 1, 1, 1) 0s infinite;

  fill: none;
  stroke-linecap: round;
  stroke-dasharray: var(--circumreference);
}

@keyframes fill-animation {
  0% {
    stroke-dasharray: 40 var(--dashOffset);
    stroke-dashoffset: var(--circumreference);
  }
  50% {
    stroke-dasharray: var(--dashArray);
    stroke-dashoffset: var(--dashArray);
  }
  100% {
    stroke-dasharray: 40 var(--dashOffset);
    stroke-dashoffset: 0;
  }
}

.icon {
  position: absolute;
}
</style>
