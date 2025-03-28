import React from 'react';

const Contact = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const data = {
      nome: formData.get("name"), // match with your backend schema
      email: formData.get("email"),
      telefono: formData.get("phone"),
      messaggio: formData.get("message"),
    };

    try {
      const response = await fetch("http://localhost:5000/api/v1/contact", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Contatto salvato con successo!");
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
          <h2 className="text-2xl font-bold mb-4">Contattaci</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Nome" className="p-2 border border-gray-300 rounded" required />
            <input name="email" type="email" placeholder="Email" className="p-2 border border-gray-300 rounded" required />
            <input name="phone" type="tel" placeholder="Telefono" className="p-2 border border-gray-300 rounded" required />
            <textarea name="message" placeholder="Messaggio" className="p-2 border border-gray-300 rounded h-32" required></textarea>
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

export default Contact;
