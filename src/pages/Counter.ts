import { reactive } from 'vue';

export const data = reactive({
  counter: 0,
  name: '',
});

/*
counter methods
*/

export const increaseCounter = () => {
  data.counter++;
};

export const decreaseCounter = () => {
  if (data.counter == 0) {
    return;
  }

  data.counter--;
};

export const resetCounter = () => {
  data.counter = 0;
};

/*
Touch Pan
*/

export interface TouchPanEvent {
  delta: TouchPanDelta;
}

export interface TouchPanDelta {
  y: number;
}

export const handlePan = (e: TouchPanEvent) => {
  if (e.delta.y < 0) increaseCounter();
  else decreaseCounter();
};
