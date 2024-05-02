import { Card, Flex, Select, Text } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useLocalStorage } from 'usehooks-ts';
export default function SubjectCard({ subject }: { subject: Avdelingskode }) {
  const [_s, setSubjects, _r] = useLocalStorage<Avdelingskode[]>('subjects', []);
  const [id, _si, _ri] = useLocalStorage<string>('snitt_id', '');
  return (
    <Card className="flex flex-col gap-1" key={subject.Emnekode} size="3">
      <div className="absolute right-4 top-4">
        <Cross1Icon
          className="cursor-pointer"
          onClick={() => setSubjects(subjects => subjects.filter(s => s.Emnekode !== subject.Emnekode))}
        />
      </div>
      <Text as="div" size="4" weight="bold">
        {subject.Emnekode}
      </Text>
      <Text as="div" size="2">
        {subject.Emnenavn}
      </Text>
      <Flex align="end" justify="between" width="100%">
        <Text as="div" size="2" weight="bold">
          {subject.Studiepoeng} stp.
        </Text>
        <Select.Root
          defaultValue={subject.Grade?.toString() || undefined}
          onValueChange={async e => {
            setSubjects(subjects => {
              subjects[subjects.findIndex(s => s.Emnekode === subject.Emnekode)] = { ...subject, Grade: parseInt(e) };
              return subjects;
            });
            await fetch(`/api/subjects`, {
              method: 'POST',
              body: JSON.stringify({ ...subject, Grade: parseInt(e), RandomId: id }),
              headers: { 'Content-Type': 'application/json' }
            });
          }}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value=" "></Select.Item>
              <Select.Label>Karakter</Select.Label>
              <Select.Item value="5">A</Select.Item>
              <Select.Item value="4">B</Select.Item>
              <Select.Item value="3">C</Select.Item>
              <Select.Item value="2">D</Select.Item>
              <Select.Item value="1">E</Select.Item>
              <Select.Item value="0">F</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Item value="-1">Godkjent</Select.Item>
              <Select.Item value="-2">Ikke Godkjent</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
    </Card>
  );
}
