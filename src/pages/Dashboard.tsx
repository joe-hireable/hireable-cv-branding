
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileUp, Settings, User, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalCVs: 24,
    optimizedCVs: 18,
    pendingOptimization: 6,
    recentCandidates: [
      { id: 1, name: "John Smith", position: "Frontend Developer", company: "Tech Corp", date: "2 hours ago" },
      { id: 2, name: "Sarah Johnson", position: "Product Manager", company: "Startup Inc", date: "Yesterday" },
      { id: 3, name: "Michael Brown", position: "UX Designer", company: "Design Studio", date: "2 days ago" },
    ]
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">Here's an overview of your recent activity</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/cv-editor')}>
            <FileUp size={16} className="mr-2" />
            Upload CV
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CVs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCVs}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimized CVs</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.optimizedCVs}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.optimizedCVs / stats.totalCVs) * 100)}% of total CVs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Optimization</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOptimization}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.pendingOptimization / stats.totalCVs) * 100)}% of total CVs
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Candidates</CardTitle>
            <CardDescription>
              Your recently uploaded or optimized CVs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentCandidates.map(candidate => (
                <div key={candidate.id} className="flex items-center gap-4 cursor-pointer hover:bg-muted p-2 rounded-md" onClick={() => navigate('/cv-editor')}>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-muted-foreground">{candidate.position} at {candidate.company}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{candidate.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you can perform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/cv-editor')}>
                <FileUp size={16} className="mr-2" />
                Upload New CV
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/profile')}>
                <User size={16} className="mr-2" />
                Update Recruiter Profile
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/candidates')}>
                <Users size={16} className="mr-2" />
                View All Candidates
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/settings')}>
                <Settings size={16} className="mr-2" />
                Configure Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
