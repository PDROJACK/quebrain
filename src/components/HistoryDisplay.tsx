
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export function HistoryDisplay() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
        <CardDescription>Display of previously researched topics with links to summaries.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li><a href="#">Topic 1 - Summary</a></li>
          <li><a href="#">Topic 2 - Summary</a></li>
        </ul>
      </CardContent>
    </Card>
  );
}
