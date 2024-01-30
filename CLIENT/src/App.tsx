import { BrowserRouter, Route, Routes } from "react-router-dom";
import Enter from "./pages/enter/Enter";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enter" element={<Enter />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;