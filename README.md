1. Avaa projekti ja luo testaus-kansio
Avaa VSCodessa oman sovelluksesi projektikansio (File > Open Folder).
Lisää projektin juurihakemistoon alihakemisto nimeltä: tests.
Lisää testaus hakemiston alle kaksi alihakemistoa: front ja back.
Näitä uusia kansioita käytetään ohjelmistotestauksen opetteluun. Myöhemmin tulette ryhmänne kanssa tekemään samanlaisen kansiorakenteen omalle terveyssovelluksellenne. Projektin kansiorakenne tulee näyttämään esim. seuraavanlaiselta:

oman-projektin-nimi
   > Frontend/
   > Backend/
   > tests/
   > resources/   
   > outputs/   
Huom! Jos sovelluksesi selain (Frontend) ja taustapalvelin (Backend) ovat erillisiä projekteja, eli sijaitsevat eri kansioissa, tee Python asennukset selaimen (Frontend) alle, esim.

selain-projektin-nimi
   > js
   > assets/
   > ...
   > tests/
   > resources/   
   > outputs/   
Lisätietoa: Project structure

2. Python-testi
Testaa ensiksi, että Python-asennus on kunnossa.

Avaa terminaali-ikkuna (CTRL+ö).
Anna terminaalissa komento:
python --version
Terminaalissa pitäisi tuloksena näkyä, esim.

Python: 3.11.2
Ongelmia? Katso, esim.

Python Tutorial | VSCode docs
3. Virtuaaliympäristön luominen
Python-virtuaaliympäristö auttaa pitämään projektin riippuvuudet erillään muista projekteista. Näin voit helposti hallita ja päivittää projektin riippuvuksia ilman, että se vaikuttaa muihin projekteihin. Virtuaaliympäristö luodaan seuraavasti:

Jatka terminaali-ikkunan käyttöä (CTRL+ö tai View > Terminal).
Aja seuraava komento:
python -m venv .venv
Tämä luo uuden hakemiston nimeltä .venv, joka sisältää virtuaaliympräistön.

Aktivoi virtuaaliympäristö antamalla komento
Windows:
.venv\Scripts\activate
macOS tai Linux:
source myenv/bin/activate
Kun virtuaaliympäristö on aktivoitu, terminaalin prompt muuttuu ja näyttää, että työskentelet nyt virtuaaliympäristössä.

Voit nyt asentaa projektin riippuvuudet virtuaaliympäristön sisälle.

34 Virtuaaliympäristön lisääminen .gitignore -tiedostoon
Jotta virtuaaliympäristön tiedostot eivät kopioituisi GitHub-kansioon, lisää .gitignore -tiedostoon seuraava rivi:

# Lisätään .venv hakemisto .gitignoreen
.venv
Tämä estää virtuaaliympäristön kopioinnin, kun julkaiset uuden version koodeistasi GitHubissa.

5. pip päivitys
Seuraavaksi kannattaa tarkistaa, että Python-pakettien asentaja (pip), on päivitetty viimeisimpään versioon. Anna terminaalissa komento:

python -m pip install --upgrade pip
Ongelmia? Katso, esim.

Installation | pip documentation
Getting started | pip documentation
6. Robot Framework asennus
Kun Python ja pip on asennettu ja päivitetty sekä olet luonut virtuaaliympäristön, seuraavaksi asennetaan Robot Framework.

Kirjoita VSCoden terminaali-ikkunaan seuraava komento:
pip install robotframework
Huom! Jos koneesi ei tunnista pip komentoa, kirjoita sen sijaan:
python -m pip install robotframework
Lisätietoa: Should I use pip or pip3 | Stackoverflow

Testaa, että asennus on onnistunut antamalla komentorivillä seuraava komento:
robot --version
Huom! Jos koneesi ei tunnista robot komentoa, kokeile:
python -m robot --version
Lisätietoa: User Guide | (robotframework.org)

7. Browser library asennus
Huom! Browser library tarvitsee toimiakseen sekä Pythonin että Node.JS asennukset. Tarkista ensiksi, että sinulla on molemmat asennettuina. Anna terminaali-ikkunassa komento:

node -v
Browser library voidaan asentaa joko selainajurien kanssa tai erikseen. Suositeltavaa on asentaa selainajureiden kanssa. Ohessa on ohjeet kuinka voit Browser library asennetaan selainajurien kanssa.

Avaa VSCodessa terminaali-ikkuna.
Asenna Browser library -kirjasto ja selainajurit antamalla komento:
pip install robotframework-browser
Alusta kirjaston toiminta:
rfbrowser init
Jos rfbrowser komentoa ei löydy, kokeile
python -m Browser.entry init
Tarkemmat ohjeet: Installation | robotframework-browser.org

8. Requests libraryn asennus
Anna terminaali-ikkunassa komento:

pip install robotframework-requests
Ongelmia? Katso RequestsLibrary - Readme

9. Cryptolibraryn asennus
Asenna CryptoLibrary antamalla komento:

pip install --upgrade robotframework-crypto
Lisätietoa: Robot Framework CryptoLibrary | pypi.org

10. Robotidyn asennus
Asenna Robotidy antamalla komento:

pip install robotframework-tidy
Lisätietoa: Robotidy documentation

11. Asennuslistan tarkistus
pip freezeon komento, joka listaa kaikki nykyisessä Python-ympäristössä asennetut paketit ja niiden versiot. Anna terminaalissa komento:

pip freeze
Tarkista, että listasta löytyvät seuraavat modulit (Huom. versionumerot voivat olla uudemmat):

...
robotframework==7.2
robotframework-assertion-engine==3.0.3
robotframework-browser==19.3.0
robotframework-crypto==0.4.2
robotframework-pythonlibcore==4.4.1
robotframework-requests==0.9.7
robotframework-tidy==4.16.0         
...
12. Luo requirements.txt-asennuslista
Voit myös ohjata pip freeze-komennon luettelon tiedostoon käyttämällä uudelleenohjausta:

pip freeze > requirements.txt
Tämä luo requirements.txt-tiedoston, joka sisältää kaikki nykyisessä ympäristössä asennetut paketit ja niiden versiot. Tämän tiedoston avulla voit asentaa samata paketit toisessa ympäristössä käyttämällä seuraavaa komentoa:

pip install -r requirements.txt
13. Asennusten testaus
Kopioi asennustesti.py tiedosto oman projektisi kansioon ja aja se. Jos asennukset ovat kunnossa, tuloksena terminaali-ikkunaan tulostuu, esim.

Robot Framework: 7.2
Browser: 19.3.0
requests: 2.32.3
CryptoLibrary: 0.4.2