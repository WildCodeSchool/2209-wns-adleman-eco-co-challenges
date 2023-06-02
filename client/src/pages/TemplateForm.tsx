
import Footer from "../components/GlobalComponents/Footer/Footer";
import FormTemplate from "../components/GlobalComponents/FormTemplate/FormTemplate";
import Header from "../components/GlobalComponents/Header/Header";

export default function TemplateForm() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="form__container">
        <FormTemplate />
      </div>
      <div className="footer"> 
        <Footer />
      </div>
    </div>
  );
}
