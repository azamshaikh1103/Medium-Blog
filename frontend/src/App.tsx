import { Home } from "./pages/Home";
import { Blog } from "./pages/Blog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import NewStory from "./pages/NewStory";

function App() {
  return (
    <div className=" font-gt">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tag/:slug" element={<Home />} />
          <Route path="/blog/:slug/:id" element={<Blog />} />
          <Route path="/u/:slug" element={<Profile />} />
          <Route path="/new-story" element={<NewStory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
