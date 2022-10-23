import DrawingPanel from "../DrawingPanel/DrawingPanel";
import {DrawContextProvider} from "../contexts/DrawContext";
import DrawingControl from "../DrawingControl/DrawingControl";
import styles from './App.module.css'

function App() {
  return (
      <DrawContextProvider>
          <h1>Draw on canvas</h1>
          <div className={styles.drawingSection}>
              <DrawingPanel/>
              <DrawingControl />
          </div>
      </DrawContextProvider>
  );
}

export default App;
