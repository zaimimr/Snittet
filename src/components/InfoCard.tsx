'use client';
import { Card, Grid, Heading, HoverCard, Text } from '@radix-ui/themes';
import { gradeToLetter } from '@/utils/utils';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
export default function InfoCard() {
  const [subjects, _set, _r] = useLocalStorage<Avdelingskode[]>('subjects', []);
  const [id, setId, _ri] = useLocalStorage<string>('snitt_id', '');
  useEffect(() => {
    if (id === '') {
      setId(crypto.randomUUID());
    }
  }, [id, setId]);
  const validSubjects = subjects.filter(s => s.Grade !== null && s.Grade > 0);
  const teller = validSubjects
    // @ts-ignore
    .map(s => s.Grade * s.Studiepoeng)
    .reduce((a, b) => a + b, 0);
  const nevner = validSubjects.map(s => s.Studiepoeng).reduce((a, b) => a + b, 0);
  const snitt = teller / nevner;
  const totalStudiepoeng = subjects.map(s => s.Studiepoeng).reduce((a, b) => a + b, 0);

  return (
    <Card className="flex w-full flex-col items-center justify-center">
      <HoverCard.Root>
        <div className="flex w-full items-end justify-center gap-2">
          <Text>Du har</Text>
          <HoverCard.Trigger>
            <div className="flex items-center gap-1">
              <Heading as="h1" className="relative cursor-pointer text-4xl" color="indigo" size="6" weight="bold">
                {gradeToLetter(snitt)}
                <InfoCircledIcon className="absolute left-4 top-0 size-3 cursor-pointer text-gray-500 hover:text-indigo-500" />
              </Heading>
            </div>
          </HoverCard.Trigger>
          <Text>i snitt.</Text>
        </div>
        <HoverCard.Content maxWidth="300px">
          <Grid columns="2" gap="4" rows="2">
            <Text>Snitt:</Text>
            <Text>{snitt.toFixed(2)}</Text>
            <Text>Studiepoeng:</Text>
            <Text>{totalStudiepoeng}</Text>
          </Grid>
        </HoverCard.Content>
      </HoverCard.Root>
    </Card>
  );
}
