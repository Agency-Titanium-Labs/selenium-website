export default function LegalNotices() {
  return (
    <>
      <h1 className="text-center text-white">Mentions Légales</h1>
      <ol>
        <li>
          <h2 className="text-white">Éditeur du site</h2>
          <p>
            Le site{" "}
            <a href="https://www.selenium-studio.com" className="text-primary">
              www.selenium-studio.com
            </a>{" "}
            est édité par :
          </p>
          <p>
            <b>Antoine FAVEREAU</b>
            <br />
            Micro-entreprise
            <br />
            65 rue Fernand-Forest 92150 Suresnes
            <br />
            e-mail :{" "}
            <a
              href="mailto:antoine@selenium-studio.com"
              className="text-primary"
            >
              antoine@selenium-studio.com
            </a>
            <br />
            Numéro SIREN : 918932278
          </p>
        </li>
        <li>
          <h2 className="text-white">Hébergeur</h2>
          <p>Le site est hébergé par :</p>
          <p>
            <b>Vercel Inc.</b>
            <br />
            340 S Lemon Ave #4133 Walnut, CA 91789 – États-Unis
            <br />
            Site web :{" "}
            <a href="https://vercel.com" className="text-primary">
              Vercel: Build and deploy the best web experiences with the AI
              Cloud
            </a>
            <br />
          </p>
          <p>
            Le nom de domaine{" "}
            <a href="https://www.selenium-studio.com" className="text-primary">
              Selenium - Agence web
            </a>{" "}
            est enregistré auprès de :
          </p>
          <p>
            <b>OVH SAS</b>
            <br />
            2 rue Kellermann, 59100 Roubaix – France
            <br />
            Site web :{" "}
            <a href="https://www.ovh.com" className="text-primary">
              OVHcloud customer
            </a>
          </p>
        </li>
        <li>
          <h2 className="text-white">Propriété intellectuelle</h2>
          <p>
            L&rsquo;ensemble du contenu du site (textes, images, vidéos,
            graphismes, logos, icônes, etc.) est la propriété exclusive de{" "}
            <b>Selenium Studio</b>, sauf mention contraire.
          </p>
          <p>
            Toute reproduction, distribution, modification ou utilisation sans
            autorisation écrite préalable est strictement interdite.
          </p>
        </li>
        <li>
          <h2 className="text-white">Données personnelles</h2>
          <p>
            Les informations collectées via les formulaires du site sont
            destinées à <b>Selenium Studio</b> dans le cadre de la gestion des
            demandes de contact, devis ou partenariats.
          </p>
          <p>
            Conformément au{" "}
            <b>Règlement Général sur la Protection des Données (RGPD)</b>, vous
            disposez d&rsquo;un droit d&rsquo;accès, de rectification et de
            suppression de vos données.
          </p>
          <p>
            Pour toute demande, contactez :{" "}
            <a
              href="mailto:contact@selenium-studio.com"
              className="text-primary"
            >
              contact@selenium-studio.com
            </a>
          </p>
          <p>
            Consultez notre{" "}
            <a href="/legal-documents/privacy-policy" className="text-primary">
              Politique de confidentialité & cookies
            </a>{" "}
            pour plus d&rsquo;informations.
          </p>
        </li>
        <li>
          <h2 className="text-white">Responsabilité</h2>
          <p>
            <b>Selenium Studio</b> s&rsquo;efforce d&rsquo;assurer la fiabilité
            des informations présentes sur le site.
          </p>
          <p>
            Cependant, l&rsquo;entreprise ne peut garantir l&rsquo;exactitude,
            la complétude ou la mise à jour de ces informations et décline toute
            responsabilité en cas d&rsquo;erreur ou d&rsquo;omission.
          </p>
        </li>
        <li>
          <h2 className="text-white">Liens externes</h2>
          <p>
            Le site peut contenir des liens vers d&rsquo;autres sites.{" "}
            <b>Selenium Studio</b> n&rsquo;exerce aucun contrôle sur ces
            contenus externes et décline toute responsabilité quant à leur
            contenu ou leur politique de confidentialité.
          </p>
        </li>
        <li>
          <h2 className="text-white">Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français.
          </p>
          <p>
            Tout litige relatif à l&rsquo;utilisation du site sera soumis à la
            compétence des tribunaux français.
          </p>
        </li>
      </ol>
    </>
  );
}
