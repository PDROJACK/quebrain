
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export function ResearchResultsDisplay() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Research Results</CardTitle>
        <CardDescription>Display of AI research results for a given topic.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Key Findings:</p>
        <ul>
          <li>Finding 1</li>
          <li>Finding 2</li>
        </ul>
        <p>Relevant Links:</p>
        <ul>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
        </ul>
        <Button>Generate Summary</Button>
      </CardContent>
    </Card>
  );
}
