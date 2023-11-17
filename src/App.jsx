import MainPage from "./pages/MainPage/MainPage"
import styles from "./global.module.scss"
import Playbar from "./components/Playbar/Playbar"
import TestProvider from "./provider/test"
import { FavoriteBorder } from "@mui/icons-material"
import { Container } from "@mui/material"

const App = () => {
  return (
    <TestProvider>
      <Container style={{textAlign: "center"}}>
        <h1>Версия для тестирования дорогих Нигг
          <FavoriteBorder fontSize="large" textAlign="center" />
        </h1>
        <p>PS. треки выбраны рандомно, прав у меня на них нет, не сдавайте пжлста ;)</p>
      </Container>

      <div className={styles.wrapper}>
        <MainPage />
        <Playbar />
      </div>
    </TestProvider>

  )
}

export default App
