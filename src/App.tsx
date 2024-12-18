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
            <Route path="venue/:id" element={<pages.Venue />} />
            <Route path="edit/:type/:id?" element={<pages.Edit />} />
            <Route path="profile/:id?" element={<pages.Profile />} />
            <Route path="list_venue" element={<pages.ListVenue />} />
            <Route path="search" element={<pages.Search />} />
            <Route path="confirmation" element={<pages.Confirmation />} />
            <Route path="success" element={<pages.CheckoutSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
