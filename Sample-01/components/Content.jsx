import React from 'react';

const Content = () => (
  <div className="next-steps my-5" style={{ padding: '0 20px' }}>
    <h2 className="my-5 text-center">Warum Awesome Travel?</h2>

    <div className="row d-flex justify-content-between">
      <div className="col-md-5 mb-4">
        <h6 className="mb-3" style={{ color: '#eb6f33', fontWeight: 'bold' }}>
          🌍 Exklusive Reiseziele
        </h6>
        <p>
          Entdecke handverlesene Destinationen weltweit. Von einsamen Stränden bis 
          hin zu aufregenden Metropolen – wir finden das perfekte Abenteuer für dich.
        </p>
      </div>

      <div className="col-md-5 mb-4">
        <h6 className="mb-3" style={{ color: '#eb6f33', fontWeight: 'bold' }}>
          🛡️ Rundum-Schutz inklusive
        </h6>
        <p>
          Durch unsere Partnerschaft mit der <strong>Travel-Safe Versicherung</strong> 
          ist jede Buchung automatisch geschützt. Sicherheit steht bei uns an erster Stelle.
        </p>
      </div>
    </div>

    <div className="row d-flex justify-content-between">
      <div className="col-md-5 mb-4">
        <h6 className="mb-3" style={{ color: '#eb6f33', fontWeight: 'bold' }}>
          🔒 Sicherer Login
        </h6>
        <p>
          Deine Daten sind bei uns sicher. Dank modernster Verschlüsselung und 
          Multi-Faktor-Authentifizierung (MFA) hast nur du Zugriff auf dein Konto.
        </p>
      </div>

      <div className="col-md-5 mb-4">
        <h6 className="mb-3" style={{ color: '#eb6f33', fontWeight: 'bold' }}>
          ✈️ 24/7 Support
        </h6>
        <p>
          Egal wo du bist, unser Team ist rund um die Uhr für dich da. Wir unterstützen 
          dich bei Umbuchungen oder Notfällen während deiner Reise.
        </p>
      </div>
    </div>
  </div>
);

export default Content;
