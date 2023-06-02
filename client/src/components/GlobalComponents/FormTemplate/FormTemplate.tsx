import "./FormTemplate.css";

const FormTemplate = () => {
  return (
    <div className="FormTemplate">
      <div className="body">
        <div className="container" id="container">
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
                  <input type="text" placeholder="Premier input" />
                  <input type="text" placeholder="Deuxième input" />
                  <textarea placeholder="Ici un textarea"></textarea>

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
