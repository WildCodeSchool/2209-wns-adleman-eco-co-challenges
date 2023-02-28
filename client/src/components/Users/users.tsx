import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { User } from "../../gql/generated/schema";

const GET_USERS = gql`
  query Users {
    users {
      id
      nickName
      hashedPassword
    }
  }
`;

const randomUser = () => {
  const gender = ["male", "female"];
  const rand = Math.floor(Math.random() * gender.length);
  return (
    "https://xsgames.co/randomusers/assets/avatars/" +
    gender[rand] +
    "/" +
    Math.floor(Math.random() * 100) +
    ".jpg"
  );
};

const Users = () => {
  const { data } = useQuery(GET_USERS);
  const navigate = useNavigate();

  function redirectToUserPage(e: React.MouseEvent<HTMLElement>, user: User) {
    e.preventDefault();
    const path = "/friend/" + user.id;
    navigate(path);
  }

  return (
    <div>
      {/* Heroe first part */}
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://img.obox.group/u-j1Ak6qH-bdf8cAuch0kBtr8GM=/2280x1282/smart/filters:format(webp)/https%3A%2F%2Flecahier.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fhelena-lopes-pgnqt0rxwls-unsplash.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              loading="lazy"
              width="700"
              height="500"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Mes amis</h1>
            <p className="lead">
              Bienvenue sur la page des amis! Ici, vous pouvez voir la liste de
              vos amis connectés à l'application Eco-challenges. Vous pouvez
              inviter de nouveaux amis à rejoindre l'application et créer des
              groupes pour participer à des défis écologiques ensemble. Cliquez
              sur un ami pour voir son profil et découvrir les défis auxquels il
              a participé. Rejoignez-les et montrez votre engagement écologique
              en accomplissant des actions durables ensemble!
            </p>
          </div>
        </div>
      </div>
      {/* Friends list, second part */}
      <div className="album py-5 bg-light">
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row row-cols-1 row-cols-sm-3 row-cols-md-5 g-5">
            {data?.users?.map((user: User) => (
              <div
                onClick={(e) => redirectToUserPage(e, user)}
                className="col"
                style={{ width: "200px" }}
              >
                <div className="card shadow-sm">
                  <img src={randomUser()} alt="" loading="lazy" />
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <div className="card-body">
                    <h3 className="card-text text-center">{user.nickName}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
