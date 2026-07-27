import { Link } from "@/lib/i18n";

import { ColumnFull, TwoColumnLayout } from "../layout";

export const SiteFooter = () => {
  return (
    <footer className="pt-24">
      <TwoColumnLayout className="bg-primary text-xs text-white lg:w-full">
        <ColumnFull className="items-center pt-12">
          <img className="h-auto w-[100px]" src="/logo.svg" />
        </ColumnFull>
        <ColumnFull className="items-center">
          <div className="m-auto flex w-full flex-col items-center gap-4 px-0 pb-12 pt-6 text-center md:flex-row md:items-start md:justify-between md:px-32 lg:w-10/12">
            <div className="w-max">
              <h3 className="font-bold uppercase">Öppettider</h3>
              <p>
                vardagar: 10 - 18 <br />
                lördagar: 12 - 16
              </p>
            </div>
            <div className="w-max">
              <h3 className="font-bold uppercase">Adress</h3>
              <p>
                Birger Jarlsgatan 32
                <br />
                114 29 STOCKHOLM
              </p>
            </div>
            <div className="w-max">
              <h3 className="font-bold uppercase">Kontakt</h3>{" "}
              <p>
                e-post: <a href="mailto:info@ronnells.se">info@ronnells.se</a>
                <br />
                telefon: 08-545 015 60
              </p>
            </div>
            <div className="w-max">
              <h3 className="font-bold uppercase">ANMÄL DIG</h3>
              <p>Nyhetsbrev evenemang</p>
            </div>
          </div>
        </ColumnFull>
        <ColumnFull className="flex flex-row items-center justify-center gap-6 pb-12 md:gap-16">
          <Link href="https://www.instagram.com/ronnellsantikvariat/">
            {" "}
            <img
              className="max-h-[50px] w-auto"
              src="/footer_logos/instagram_white.png"
              alt="Instagram Logo"
            />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=100043755627022#">
            {" "}
            <img
              className="max-h-[50px] w-auto"
              src="/footer_logos/facebook_white.png"
              alt="Facebook Logo"
            />
          </Link>
          <Link href="http://www.svaf.se/">
            {" "}
            <img
              className="max-h-[50px] w-auto"
              src="/footer_logos/svaf.png"
              alt="Svenska Antikvariatföreningen Logo"
            />
          </Link>
          <Link href="https://ilab.org/">
            {" "}
            <img
              className="max-h-[50px] w-auto"
              src="/footer_logos/ilab.png"
              alt="International League of Antiquarian Booksellers Logo"
            />
          </Link>
          <Link href="http://www.ronnellsvanner.se/">
            {" "}
            <img
              className="max-h-[50px] w-auto"
              src="/footer_logos/rv.png"
              alt="Rönnells Vänförening Logo"
            />
          </Link>
        </ColumnFull>
      </TwoColumnLayout>
    </footer>
  );
};
