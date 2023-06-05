import SecondForm from "../components/EventComponents/EventAddActionsForm/SecondForm";
import Footer from "../components/GlobalComponents/Footer/Footer";
import Header from "../components/GlobalComponents/Header/Header";

export default function EventAddActions() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="form__container">
        <SecondForm />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
