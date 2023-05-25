
import Footer from "../components/GlobalComponents/Footer/Footer";
import Header from "../components/GlobalComponents/Header/Header";
import UserUpdate from "../components/UserComponents/UserUpdate/UserUpdate";

export default function UserDashboard() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div>
        <UserUpdate />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
