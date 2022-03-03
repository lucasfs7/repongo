import Game from './components/Game'
import { WebsocketProvider } from './contexts/websocket'

export default function App() {
  return (
    <WebsocketProvider url="ws://localhost:8080">
      <Game />
    </WebsocketProvider>
  )
}
