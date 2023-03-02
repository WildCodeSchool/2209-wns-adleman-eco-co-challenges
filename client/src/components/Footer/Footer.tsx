import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer__column">
        <ul>
          <li> Adresse ligne 1</li>
          <li> Adresse ligne 2</li>
          <li> Adresse ligne 3</li>
        </ul>

        <div className="footer__column">
          RGPD : on a vos données et elles vont nous rendre riches!
        </div>
      </div>
      <div className="footer__end">Powered by Eco-co Challenges - 2023</div>
    </footer>
  );
}
