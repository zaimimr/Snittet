'use client';
import { Button, Callout, Card, Code, Heading, IconButton, Link, Text, TextField } from '@radix-ui/themes';
import { HomeIcon, IdCardIcon, InfoCircledIcon, ReloadIcon, RocketIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import NextLink from 'next/link';
export default function Home() {
  const [id, setId, _r] = useLocalStorage<string>('snitt_id', '');
  const [showId, setShowId] = useState<boolean>(false);
  const [value, setValue] = useState<string>(id);
  useEffect(() => {
    if (id === '') {
      const temp = crypto.randomUUID();
      setId(temp);
      setValue(temp);
    }
  }, [id, setId]);
  return (
    <main className="flex w-full flex-col items-center gap-4">
      <IconButton className="absolute right-4 top-4" asChild>
        <NextLink href="/">
          <HomeIcon height="15" width="15" />
        </NextLink>
      </IconButton>
      <Card className="flex w-full flex-col justify-center gap-4">
        <Heading as="h1">Om Snittkalkulator</Heading>
        <Text>
          Velkommen til Snittkalkulator, en nettressurs designet for å tilby en enkel og intuitiv løsning for å beregne
          din gjennomsnittlige karakter. Vårt mål er å gjøre det enklere for studenter å få en klar oversikt over sin
          akademiske prestasjon gjennom en brukervennlig karakterkalkulator.
        </Text>
        <Heading as="h3">Hvor Vi Får Data Fra</Heading>
        <Text>
          Snittkalkulator benytter seg av emnedata fra{' '}
          <Link href="https://dbh.hkdir.no/"> Database for høyere utdanning i Norge</Link>, som sikrer at all
          informasjon brukt i våre kalkulasjoner er oppdatert og nøyaktig.
        </Text>
        <Heading as="h3">Hvordan Vi Kalkulerer Ditt Snitt</Heading>
        <Text>
          For å beregne ditt gjennomsnitt, bruker vi en formel som vekter karakterene dine etter studiepoeng. Dette
          gjøres ved å multiplisere hver karakterverdi med tilhørende studiepoeng og deretter dele summen av disse
          produktene med den totale summen av studiepoengene:
        </Text>
        <Text>
          <Code>
            Snitt = (Karakter1 * Studiepoeng1 + Karakter2 * Studiepoeng2 + ... + KarakterN * StudiepoengN) /
            (Studiepoeng1 + Studiepoeng2 + ... + StudiepoengN)
          </Code>
        </Text>
        <Text>Karakterene omregnes til tallverdier som følger:</Text>
        <Text>A = 5, B = 4, C = 3, D = 2 og E = 1</Text>
        <Text>Stryk og Godkjent/Ikke godkjent blir ikke telt med i regnestykket.</Text>
        <Heading as="h3">Din Data og Personvern</Heading>
        <Text>
          Vi verdsetter ditt personvern. All data du legger inn blir lagret lokalt på din enhet samt i skyen med en
          autogenerert ID. Om du ønsker å ikke ha noe tilhørlighet til denne dataen kan du endre på den autogenererte
          IDen ved å trykke på knappen under. Vær trygg på at ingen fag eller karakterer kan bli knyttet tilbake til deg
          som enkeltperson.
        </Text>
        <Button
          className="w-fit"
          onClick={() => {
            setShowId(state => !state);
            setValue(id);
          }}
        >
          {showId ? 'Skjul' : 'Vis'} ID
        </Button>
        {showId && (
          <>
            <TextField.Root defaultValue={id} value={value} onChange={e => setValue(e.target.value)}>
              <TextField.Slot>
                <IdCardIcon height="16" width="16" />
              </TextField.Slot>
              {id !== value ? (
                <TextField.Slot>
                  <IconButton
                    size="1"
                    variant="ghost"
                    onClick={e => {
                      if (value !== '' || value !== undefined || value !== null) {
                        setId(value);
                      } else {
                        setId(crypto.randomUUID());
                      }
                    }}
                  >
                    <RocketIcon height="14" width="14" />
                  </IconButton>
                </TextField.Slot>
              ) : (
                <TextField.Slot>
                  <IconButton
                    size="1"
                    variant="ghost"
                    onClick={e => {
                      const temp = crypto.randomUUID();
                      setValue(temp);
                    }}
                  >
                    <ReloadIcon height="14" width="14" />
                  </IconButton>
                </TextField.Slot>
              )}
            </TextField.Root>
            {id !== value && (
              <Callout.Root>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>Husk å lagre ved å trykke på den lille raketten.</Callout.Text>
              </Callout.Root>
            )}
          </>
        )}
        <Heading as="h3">Hvem Er Denne Tjenesten For?</Heading>
        <Text>
          Snittkalkulator er ideell for studenter ved en rekke høyskoler og universiteter som benytter lignende
          beregningsmetoder, inkludert, men ikke begrenset til, OsloMet, Universitetet i Oslo (UiO), og Norges
          teknisk-naturvitenskapelige universitet (NTNU). Vær oppmerksom på at ulike institusjoner kan ha spesifikke
          regler for karakterberegning, så vår tjeneste er ment som en generell veiledning.
        </Text>
        <Text>
          Vi håper Snittkalkulator vil være et nyttig verktøy for deg som student til å bedre forstå og planlegge din
          akademiske fremtid. Ta gjerne{' '}
          <Link href="https://www.zaim.no/?from=snitt" target="_blank">
            kontakt
          </Link>{' '}
          om du har spørsmål eller trenger ytterligere assistanse.
        </Text>
      </Card>
    </main>
  );
}
