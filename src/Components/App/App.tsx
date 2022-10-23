import DrawingPanel from "../DrawingPanel/DrawingPanel";
import {DrawContextProvider} from "../contexts/DrawContext";
import DrawingControl from "../DrawingControl/DrawingControl";
import styles from './App.module.css'

function App() {
  return (
      <DrawContextProvider>
          <div className={styles.container}>
              <div className={styles.drawingSection}>
                  <DrawingControl />
                  <DrawingPanel/>
              </div>
          </div>

      </DrawContextProvider>
  );
}

export default App;
