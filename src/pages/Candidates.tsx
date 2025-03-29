
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Eye, FileDown, MoreHorizontal, Pencil, Plus, Search, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Candidate {
  id: number;
  name: string;
  position: string;
  company: string;
  lastUpdated: string;
  status: "New" | "Optimized" | "Exported";
}

const Candidates = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [candidates] = useState<Candidate[]>([
    { 
      id: 1, 
      name: "John Smith", 
      position: "Frontend Developer", 
      company: "Tech Corp", 
      lastUpdated: "2 hours ago", 
      status: "Optimized" 
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      position: "Product Manager", 
      company: "Startup Inc", 
      lastUpdated: "Yesterday", 
      status: "Exported" 
    },
    { 
      id: 3, 
      name: "Michael Brown", 
      position: "UX Designer", 
      company: "Design Studio", 
      lastUpdated: "2 days ago", 
      status: "New" 
    },
    { 
      id: 4, 
      name: "Emma Wilson", 
      position: "Backend Developer", 
      company: "Software Solutions", 
      lastUpdated: "3 days ago", 
      status: "Optimized" 
    },
    { 
      id: 5, 
      name: "Robert Taylor", 
      position: "DevOps Engineer", 
      company: "Cloud Systems", 
      lastUpdated: "1 week ago", 
      status: "Exported" 
    },
    { 
      id: 6, 
      name: "Jennifer Lee", 
      position: "Data Scientist", 
      company: "AI Labs", 
      lastUpdated: "1 week ago", 
      status: "New" 
    },
    { 
      id: 7, 
      name: "David Chen", 
      position: "Full Stack Developer", 
      company: "WebTech", 
      lastUpdated: "2 weeks ago", 
      status: "Optimized" 
    },
  ]);

  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditCandidate = (id: number) => {
    navigate('/cv-editor');
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Optimized":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Exported":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">Manage your candidate CVs</p>
        </div>
        <Button onClick={() => navigate('/cv-editor')}>
          <Plus size={16} className="mr-2" />
          Add Candidate
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>{candidate.company}</TableCell>
                  <TableCell>{candidate.lastUpdated}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClasses(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCandidate(candidate.id)} className="cursor-pointer">
                          <Pencil size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye size={14} className="mr-2" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <FileDown size={14} className="mr-2" />
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-destructive">
                          <Trash size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No candidates found. Try adjusting your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Candidates;
