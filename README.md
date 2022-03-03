# RePonGO

A simple pong game where you controll in the browser and the game calculates in the server, communicating via websockets. The client is a single page application in react.js and server is in go.


## Client

bundler: [parcel](https://parceljs.org/)
render library: [react](https://reactjs.org/)
styles: [styled-components](https://styled-components.com/) + [styled-system](https://styled-system.com/)

### installing dependencies
```
$ npm i
```

### running locally
```
$ npm run start
```

### building for production
```
$ npm run start
```

## Server

websockets library: [golang.org/x/net/websocket](https://golang.org/x/net/websocket)
pong implementation inspired by: [go-pong](https://github.com/jtestard/go-pong)

### running
```
$ go run main.go
```

