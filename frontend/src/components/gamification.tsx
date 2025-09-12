import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import { Zap } from 'lucide-react';
import PointsTasks from './PointsTasks'; // ✅ updated import

const getPoints = () => {
  if (typeof window === 'undefined') return 0;
  const pointsStr = localStorage.getItem('gamificationPoints');
  return pointsStr ? parseInt(pointsStr, 10) : 0;
};

export function Gamification() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      setPoints(getPoints());
    };

    // Set initial points
    handleStorageChange();

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Card className={undefined}>
      <CardHeader className={undefined}>
        <CardTitle className="font-headline text-lg">
          Your Points & Tasks
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-primary" />
            <span className="font-semibold">Points</span>
          </div>
          <span className="text-lg font-bold">{points}</span>
        </div>

        {/* ✅ Now using PointsTasks instead of TasksWidget */}
        <PointsTasks />
      </CardContent>
    </Card>
  );
}
