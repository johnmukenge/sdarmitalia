import articleImg from "../../assets/article.jpg";

const FindChurches = () => {
  return (
    <section className="p-8 bg-gray-100 flex flex-col items-center">
      {/* Sezione superiore con due colonne */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Vieni a trovarci in una delle nostre chiese</h2>
          <p className="mt-4">Scopri le sedi delle nostre chiese in diverse città e vieni a trovarci.</p>
        </div>
        <div>
          <img src={articleImg} alt="Chiesa" className="w-full h-auto rounded-lg shadow" />
        </div>
      </div>
      
      {/* Sezione con la griglia delle chiese */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white shadow-lg rounded-lg">
        {/* Chiesa di Trieste */}
        <div>
            <h3 className="text-lg font-semibold">Chiesa di Trieste</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        {/* Chiesa di Torino */}
        <div>
            <h3 className="text-lg font-semibold">Chiesa di Torino</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        {/* Chiesa di Capolona */}
        <div>
            <h3 className="text-lg font-semibold">Chiesa di Milano</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
        </div>

        <div>
            <h3 className="text-lg font-semibold">Chiesa di Poppi</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Chiesa di Capolona</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Chiesa di Roma</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
      </div>
    </section>
  );
};

export default FindChurches;
