import Game from './components/Game'
import { WebsocketProvider } from './contexts/websocket'

const serverUrl = `ws://${process.env.REACT_APP_SERVER_URL}`
console.log(serverUrl)

export default function App() {
  return (
    <WebsocketProvider url={serverUrl}>
      <Game />
    </WebsocketProvider>
  )
}
