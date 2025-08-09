<template>
  <div class="centered w-full h-full gap-3 text">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<style>
@keyframes opac {
  0% {
    opacity: 0%;
  }

  5% {
    opacity: 50%;

  }

  20% {
    opacity: 100%;

  }

  40% {
    opacity: 50%;

  }

  100% {
    opacity: 0%;
  }
}

.dot {
  width: .5rem;
  height: .5rem;
  border-radius: 100%;
  animation: opac 1s infinite ease-in-out;
  background-color: white;
}

.dot:nth-child(1) {
  background-color: #ffffffb4;
}

.dot:nth-child(2) {
  background-color: #ffffff8e;
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  background-color: #ffffff6b;
  animation-delay: 0.6s;
}
</style>
