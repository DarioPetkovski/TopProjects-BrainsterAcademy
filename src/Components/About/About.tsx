function About() {
  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-6">
          <img
            src={require("../../assets/images/about1.png")}
            alt=""
            className="w-75"
          />
        </div>
        <div className="col-6">
          <h3>За нас</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            temporibus consequatur earum corrupti dolor voluptates dicta iste
            aliquid odio quia dolores amet, quidem voluptate magnam quae
            eligendi facilis rem maiores quas. Eum cumque dolorum facere! Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Alias soluta
            earum eum placeat quod libero corrupti autem eveniet fugiat totam,
            quibusdam, harum hic ea laudantium, rem recusandae unde omnis eius!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            consequatur quisquam sapiente ab porro sed dolores eum ratione
            repellendus reiciendis.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <p>
            Corrupti dolor voluptates dicta iste aliquid odio quia dolores amet,
            quidem voluptate magnam quae eligendi facilis rem maiores quas. Eum
            cumque dolorum facere! Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Alias soluta earum eum placeat quod libero
            corrupti autem eveniet fugiat totam, quibusdam, harum hic ea
            laudantium, rem recusandae unde omnis eius! Lorem ipsum dolor sit
            amet consectetur, adipisicing elit. Deserunt consequatur quisquam
            sapiente ab porro sed dolores eum ratione repellendus reiciendis.
          </p>
        </div>
        <div className="col-6">
          <img
            src={require("../../assets/images/about2.png")}
            alt=""
            className="w-75"
          />
        </div>
      </div>
      <h3>Контактирај не</h3>
      <br />
      <p>
        <b>Членови и посетители</b>
      </p>
      <br />
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas aut
        alias provident cum debitis repellendus?
      </p>
      <ul>
        <li>Email: info@datahub.com</li>
        <li>Facebook: DataHub</li>
        <li>Twitter: DataHub</li>
        <li>Instagram: datahub</li>
      </ul>
      <br />
      <p>
        <b>Членови и посетители</b>
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam aliquam
        facere atque quo. privacy@datahub.com
      </p>
      <br />
      <p>
        <b>Трговци, производители и огласувачи</b>
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam aliquam
        facere atque quo. privacy@datahub.com
      </p>
    </div>
  );
}

export default About;
