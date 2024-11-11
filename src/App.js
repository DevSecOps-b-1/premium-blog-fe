import { AllRoutes } from "./routes/AllRoutes";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { getCookie } from "./lib/cookieHelper";
import axios from "axios";
import { getUserStatusRoute } from "./routes/APIRoutes";

function App() {
  const [isAuth, setIsAuth] = useState(getCookie("userId"));
  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    async function getUserStatus(id) {
      const { data } = await axios.post(getUserStatusRoute, { identifier: id });
      console.log(data);
      setUserStatus(data);
    }
    if (isAuth) getUserStatus(+isAuth);
    else console.log("user not logged in");
  }, []);

  return (
    <div className="App">
      <Header isAuth={isAuth} setIsAuth={setIsAuth} userStatus={userStatus} />
      <AllRoutes
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        userStatus={userStatus}
      />
      <Footer />
    </div>
  );
}

export default App;
