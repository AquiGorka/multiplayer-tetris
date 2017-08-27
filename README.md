# Multiplayer Tetris

PoC for a multiplayer tetris game. Two smartphones connect via webrtc to a third webrtc client where two tetris boards are rendered. The player that lasts the longest wins.

![Multiplayer Tetris screenshot](https://raw.githubusercontent.com/AquiGorka/multiplayer-tetris/master/static/screenshot.png)


## How to play

Start a dev server (see below) or any server with a build (see below too) and then connect to players that send swipe events via webrtc (swipe-left, swipeup. swipe-right & swipe-down).

You can use this app to do so: https://github.com/AquiGorka/simple-webrtc-events-peer


## Dev
```sh
npm i
npm start
```


## Build
```sh
npm run build
```
