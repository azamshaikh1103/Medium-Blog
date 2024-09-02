import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tag/:slug" element={<Home />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/u/:slug" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
