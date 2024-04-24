import { Card, Heading, Text } from '@radix-ui/themes';
import { fetchVal } from '@/val/val.rsc';
import IndexVal from '@/content/pages/index.val';

export default async function Home() {
  const { title, description } = await fetchVal(IndexVal);
  return (
    <main>
      <Card className="flex flex-col items-center justify-center">
        <Heading>{title}</Heading>
        <Text>{description}</Text>
      </Card>
    </main>
  );
}
