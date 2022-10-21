# Snittet
![Build and Deploy](https://github.com/Zenjjim/Snittet/workflows/Build%20and%20Deploy/badge.svg?branch=master)
### Snitt kalkulator for NTNU studenter
Hostet hos [snitt.zaim.no](https://snitt.zaim.no)

Snittet er lagret for NTNU studenter som lar deg enkelt regne ut snittet ditt. Ved å automatisk hente informasjon om fagene, slipper brukeren å søke opp faget manuelt for å finne antall studiepoeng og hvordan snittet til faget er osv. 

All informasjon lagres kun lokalt på brukerens maskin og vil aldri kunne bli akksessert av andre. 

Applikasjonen bruker [grades.no](https://grades.no) apiet, for å hente ut informasjon om fagene, inkludert gjennomsnittlig karakter og antall studiepoeng.
For lazy search er det brukt Firebase cloud functions som årlig henter alle fag koder og -navn til firestore. Dette er gjort fordi [grades.no](https://grades.no) apiet ikke har lazy-søkefunksjonalitet for fagene. 

## Future roadmap:
- [x] Implementer godkjent/ikke godkjent karakter skala
- [ ] Implementer oversikt over karakter fordeling til ethvert fag
- [ ] Implementer ønskelig global lagring av data ved innlogging
- [x] Oversikt over total studiepoeng
- [x] Fikse Grid for IPad

---
Ved ønsker om funksjonalitet lag gjerne en issue eller PR. 
