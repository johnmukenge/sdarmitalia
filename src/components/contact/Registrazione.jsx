
const Registrazione = () => {

  const onSearch = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nome = formData.get("nome");

    try {
      const response = await fetch(`http://localhost:5000/api/v1/registration/${nome}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("Membro trovato: " + JSON.stringify(data.data)); // Display member data
        } else {
          alert("Membro non trovato.");
        }
      }
    } catch (error) {
      console.error("Errore:", error);
      alert("Si è verificato un errore durante la ricerca del membro.");
      
    }

  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const data = {
      email: formData.get("email"), // match with your backend schema
      nome: formData.get("nome"),
      cognome: formData.get("cognome"),
      telefono: formData.get("telefono"),
      dataNascita: formData.get("dataNascita"),
      luogoNascita: formData.get("luogoNascita"),
      sesso: formData.get("sesso"),
      tipoAlloggio: formData.get("tipoAlloggio"),
      messaggio: formData.get("messaggio"),
    };

    try {
      const response = await fetch("http://localhost:5000/api/v1/registration", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Registrazione salvato con successo!");
        event.target.reset(); // Reset form after successful submission
      } else {
        const errorData = await response.json();
        alert("Errore nel salvataggio: " + errorData.message);
      }
    } catch (error) {
      console.error("Errore:", error);
      alert("Si è verificato un errore.");
    }
  };

  return (
    <section className="p-8 bg-gray-100 flex flex-col items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white shadow-lg rounded-lg">
        {/* Colonna del Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Registrati</h2>
          {/* Ricerca membro */}
          <form className="flex flex-col space-y-4" onSubmit={onSearch}>
            <input name="nome" type="text" placeholder="Nome" className="p-2 border border-gray-300 rounded" required />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Cerca</button>
          </form>

          {/* Ricerca membro */}
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input name="nome" type="text" placeholder="Nome" className="p-2 border border-gray-300 rounded" required />
            <input name="cognome" type="text" placeholder="Cognome" className="p-2 border border-gray-300 rounded" required />
            <input name="email" type="email" placeholder="Email" className="p-2 border border-gray-300 rounded" required />
            <input name="dataNascita" type="date" placeholder="Data di Nascita" className="p-2 border border-gray-300 rounded" required />
            <input name="luogoNascita" type="text" placeholder="Luogo di Nascita" className="p-2 border border-gray-300 rounded" required />
            <select name="sesso" className="p-2 border border-gray-300 rounded" required>
              <option value="">Seleziona Sesso</option>
              <option value="maschio">Maschio</option>
              <option value="femmina">Femmina</option>
            </select>
            <select name="tipoAlloggio" className="p-2 border border-gray-300 rounded" required>
              <option value="">Tipo di Alloggio</option>
              <option value="casa">Casa</option>
              <option value="appartamento">Appartamento</option>
              <option value="albergo">Albergo</option>
              <option value="hotel">Hotel</option>
              <option value="ostello">Ostello</option>
              <option value="altro">Altro</option>
            </select>
            <input name="telefono" type="tel" placeholder="Telefono" className="p-2 border border-gray-300 rounded" required />
            <textarea name="messaggio" placeholder="Messaggio" className="p-2 border border-gray-300 rounded h-32" required></textarea>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Invia</button>
          </form>
        </div>
        
        {/* Colonna delle Informazioni */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Le nostre sedi</h2>
          <div>
            <h3 className="text-lg font-semibold">Sede Italia</h3>
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
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Sede Centrale</h3>
            <p>5240 Hollins Road Roanoke, Virginia 24019 U.S.A.</p>
            <p>Phone: +1 (540) 362-1800</p>
            <p>Fax: +1 (540) 366-2814</p>
            <p>Email: info@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.930327463778!2d-79.928445!3d37.324725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x884d0b5dc92f2e29%3A0xc4b1a82a1ffb94b4!2s5240%20Hollins%20Rd%2C%20Roanoke%2C%20VA%2024019%2C%20USA!5e0!3m2!1sen!2sit!4v1647811844233!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registrazione;
