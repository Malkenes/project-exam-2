import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import * as pages from "./pages";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<pages.Home />} />
            <Route path="signin" element={<pages.SignIn />} />
            <Route path="register" element={<pages.Register />} />
            <Route path="edit/:id" element={<pages.Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
