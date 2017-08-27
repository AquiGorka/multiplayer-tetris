# Multiplayer Tetris

PoC for a multiplayer tetris game. Two smartphones connect via webrtc to a third webrtc client where two tetris boards are rendered. The player that lasts the longest wins.

![Multiplayer Tetris screenshot](https://raw.githubusercontent.com/AquiGorka/multiplayer-tetris/master/static/screenshot.png)


## How to play

Start a dev server (see below) or any server with a build (see below too) and then connect two players that send swipe events via webrtc (swipe-left, swipe-up. swipe-right & swipe-down).

You can use this app to do so: https://github.com/AquiGorka/simple-webrtc-events-peer (if you are using such app please include the following query param ```pid=server``` so that all the peers connect to the same namespace)


## Dev
```sh
npm i
npm start
```


## Build
```sh
npm run build
```


### WebRTC support

Uses PeerJS to contact peers with each other. To make this work add your own PeerJS Api Key


### Demo

Board (open this in your computer): http://multi-tetris.surge.sh

Controllers (open in Android smartphone or Chrome/Firefox in desktop): http://swipe.surge.sh
