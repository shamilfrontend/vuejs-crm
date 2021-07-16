<template>
  <div class="page-wrap">
    <transition
      name="component-fade"
      :duration="{ enter: 0, leave: 500 }"
    >
      <div
        v-if="isLoaderShown"
        class="page-wrap__loading"
      >
        <big-loader
          ref="image"
          class="page-wrap__loading-image"
          :style="{ 'animation-iteration-count': iterationCount }"
          width="72px"
          height="72px"
        />
      </div>
    </transition>

    <div
      class="page-wrap__header"
      :class="headerClasses"
      :style="headerStyles"
    >
      <q-container>
        <div class="page-wrap__header-inner">
          <div class="page-wrap__breadcrumbs">
            <q-breadcrumbs
              :custom-routes="customRoutes"
              :last="lastCrumb"
            />
            <div
              v-if="lastCrumbPostfix"
              class="page-wrap__breadcrumbs-postfix"
            >
              {{ lastCrumbPostfix }}
            </div>
          </div>

          <div
            v-if="$slots['header-actions']"
            class="page-wrap__actions"
          >
            <slot name="header-actions" />
          </div>
        </div>
      </q-container>
    </div>
    <div class="page-wrap__body">
      <slot />
    </div>
  </div>
</template>

<script>
import BigLoader from '@/components/icons/BigLoader';

const ANIMATION_TIME_IN_MS = 590;

export default {
  name: 'QPageWrap',

  components: { BigLoader },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    customRoutes: {
      type: Array,
      default: null,
    },
    lastCrumb: {
      type: String,
      default: null,
    },
    lastCrumbPostfix: {
      type: String,
      default: null,
    },
    statusColor: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      timer: null,
      iterationCount: 1,
      isLoaderShown: false,
    };
  },

  computed: {
    headerClasses() {
      return {
        'page-wrap__header_has-status': this.statusColor,
      };
    },

    headerStyles() {
      return {
        'border-bottom-color': this.statusColor,
      };
    },
  },

  watch: {
    loading(value) {
      if (value || !this.timer) return;
      clearInterval(this.timer);
    },
  },

  created() {
    if (!this.loading) return;

    this.isLoaderShown = true;

    document.documentElement.style.overflowY = 'hidden';
    this.timer = setInterval(() => {
      this.iterationCount += 1;
    }, ANIMATION_TIME_IN_MS);
  },

  mounted() {
    if (this.timer) {
      this.$refs.image.$el.addEventListener(
        'animationend',
        this.handleAnimationEndEvent,
      );
    }
  },

  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
    document.documentElement.style.overflowY = '';
    if (this.$refs.image.$el) {
      this.$refs.image.$el.removeEventListener(
        'animationend',
        this.handleAnimationEndEvent,
      );
    }
  },

  methods: {
    handleAnimationEndEvent() {
      document.documentElement.style.overflowY = '';
      this.isLoaderShown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes imageRotating {
  0% {
    transform: rotateZ(-90deg);
  }

  100% {
    transform: rotateZ(270deg);
  }
}

.page-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__loading {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin-top: -100vh;
    background-color: var(--color-tertiary-gray-lighter);

    &-image {
      transform: rotateZ(-90deg);
      animation: imageRotating 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  }

  &__header {
    &_has-status {
      margin-bottom: 32px;
      border-bottom-width: 4px;
      border-bottom-style: solid;
    }
  }

  &__header-inner {
    display: flex;
    justify-content: space-between;
    padding-top: 32px;
    padding-bottom: 32px;
  }

  &__breadcrumbs {
    display: flex;
    align-items: baseline;
    padding-top: 4px;
    padding-bottom: 5px;

    &:not(:last-child) {
      margin-right: 32px;
    }
  }

  &__breadcrumbs-postfix {
    margin-left: 4px;
    font-weight: var(--font-weight-bold);
    font-size: 16px;
    line-height: var(--line-height-base);
    color: var(--color-primary-black);
  }

  &__body {
    flex: 1;
    padding-bottom: 80px;
  }
}
</style>
