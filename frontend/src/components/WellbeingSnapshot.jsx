import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";

// ✅ UI Components (from shadcn)
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ✅ Icons
import {
  User,
  GraduationCap,
  Heart,
  Smile,
  BarChart,
  Bed,
  ListChecks,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Wind,
  Lock,
} from "lucide-react";

export default function WellbeingSnapshot() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("No user logged in");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://127.0.0.1:8000/api/screening/latest/${user.uid}`
        );

        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch screening data");
      } finally {
        setLoading(false);
      }
    };

    fetchSnapshot();
  }, []);

  if (loading) return <p>Loading wellbeing snapshot...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No wellbeing data found.</p>;

  // 🔹 Risk level helper
  const getRiskLevel = (value) => {
    switch (value) {
      case "Often":
      case "Always":
        return { label: "High", className: "bg-red-500 text-white" };
      case "Sometimes":
        return { label: "Moderate", className: "bg-yellow-400 text-black" };
      default:
        return { label: "Low", className: "bg-green-500 text-white" };
    }
  };

  const stressRisk = getRiskLevel(data.interest);
  const anxietyRisk = getRiskLevel(data.anxiety);

  return (
    <Card className="col-span-1">
      {/* Header */}
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-2xl">
          <Sparkles className="text-primary" />
          Your Wellbeing Snapshot
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6 text-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span>Hi, {data.name || "Student"}!</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <span>
                {data.year || "N/A"} – {data.course || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {data.hobbies?.length > 0 ? (
                  data.hobbies.map((hobby) => (
                    <Badge key={hobby} variant="secondary">
                      {hobby}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="secondary">No hobbies listed</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Smile className="h-5 w-5 text-muted-foreground" />
              <span>
                AI Mood Mirror:{" "}
                <Badge variant="outline">{data.mood || "N/A"}</Badge>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart className="h-5 w-5 text-muted-foreground" />
              <span>
                Stress:{" "}
                <Badge className={stressRisk.className}>
                  {stressRisk.label}
                </Badge>{" "}
                | Anxiety:{" "}
                <Badge className={anxietyRisk.className}>
                  {anxietyRisk.label}
                </Badge>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Bed className="h-5 w-5 text-muted-foreground" />
              <span>Sleep: ~{data.sleep_hours || "N/A"} hrs/night</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Challenges + Support */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <ListChecks className="text-primary" /> Top Challenges
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.challenges?.length > 0 ? (
                data.challenges.map((c) => <Badge key={c}>{c}</Badge>)
              ) : (
                <Badge>No challenges listed</Badge>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <ShieldCheck className="text-primary" /> Safety & Support
            </h3>
            <div className="flex items-center gap-3">
              <span>
                SOS Contacts Added:{" "}
                <Badge
                  variant="outline"
                  className={
                    (data.sosContacts?.length || 0) > 0
                      ? "text-green-600 border-green-600"
                      : ""
                  }
                >
                  Yes ({data.sosContacts?.length || 0})
                </Badge>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                Preferred Support:{" "}
                <Badge variant="secondary">{data.support_style || "N/A"}</Badge>
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex-col items-start gap-4">
        <h3 className="font-semibold">Next Step Suggestions</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <BookOpen className="mr-2" />
            Try the Exam Stress Toolkit
          </Button>
          <Button variant="outline" size="sm">
            <Wind className="mr-2" />
            Start a 5-min Guided Relaxation
          </Button>
          <Button variant="outline" size="sm">
            <Lock className="mr-2" />
            Book a Counseling Session
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(data.created_at).toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  );
}
