import "./FormTemplate.css";

const FormTemplate = () => {
  return (
    <div className="FormTemplate">
      <div className="body">
        <div className="container">
          <div className="title-container">
            <h1>Salut l'ami !</h1>
            <br />
            <h2>Ici tu peux changer tes données</h2>
          </div>
          <div className="form-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <form>
                  <h2>Nom du formulaire</h2>
                  <div className="form-floating w-100">
                    <input
                      type="text"
                      placeholder="Premier input"
                      id="firstInput"
                    />
                    <label htmlFor="firstInput">First input </label>
                  </div>
                  <div className="form-floating w-100">
                    <input type="text" placeholder="Deuxième input" id="secondInput"/>
                    <label htmlFor="secondInput">Second input </label>
                  </div>
                  <div className="form-floating w-100">
                    <textarea placeholder="Ici un textarea" id="firstTextarea"></textarea>
                    <label htmlFor="firstTextarea">Textarea</label>

                  </div>
                  <button type="submit">Enregistrer</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTemplate;
