"use client"

// pages/job-recommendation.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Define types for our form data and options
interface FormData {
  skills: string[];
  education: string;
  interests: string[];
  preferredLocation: string;
  salaryExpectation: number[];
  experience: string;
}

interface Option {
  id: string;
  label: string;
}

interface JobRecommendation {
  title: string;
  company: string;
  salary?: number;
  match_score: number;
}

interface ApiResponse {
  recommendations?: JobRecommendation[];
  message?: string;
}

export default function JobRecommendationForm() {
  const [formData, setFormData] = useState<FormData>({
    skills: [],
    education: '',
    interests: [],
    preferredLocation: '',
    salaryExpectation: [60000],
    experience: '',
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableSkills: Option[] = [
    { id: "Python", label: "Python" },
    { id: "JavaScript", label: "JavaScript" },
    { id: "TypeScript", label: "TypeScript" },
    { id: "React", label: "React" },
    { id: "Angular", label: "Angular" },
    { id: "Vue", label: "Vue.js" },
    { id: "Node.js", label: "Node.js" },
    { id: "Express", label: "Express" },
    { id: "Django", label: "Django" },
    { id: "Flask", label: "Flask" },
    { id: "AWS", label: "AWS" },
    { id: "Azure", label: "Azure" },
    { id: "GCP", label: "Google Cloud" },
    { id: "Docker", label: "Docker" },
    { id: "Kubernetes", label: "Kubernetes" },
    { id: "SQL", label: "SQL" },
    { id: "NoSQL", label: "NoSQL" },
    { id: "MongoDB", label: "MongoDB" },
    { id: "GraphQL", label: "GraphQL" },
    { id: "REST", label: "REST API" },
    { id: "Java", label: "Java" },
    { id: "C#", label: "C#" },
    { id: "C++", label: "C++" },
    { id: "Go", label: "Go" },
    { id: "Rust", label: "Rust" },
    { id: "Swift", label: "Swift" },
    { id: "Kotlin", label: "Kotlin" }
  ];

  const interestAreas: Option[] = [
    { id: "Web development", label: "Web Development" },
    { id: "Mobile development", label: "Mobile Development" },
    { id: "Cloud computing", label: "Cloud Computing" },
    { id: "DevOps", label: "DevOps" },
    { id: "Artificial intelligence", label: "Artificial Intelligence" },
    { id: "Machine learning", label: "Machine Learning" },
    { id: "Data science", label: "Data Science" },
    { id: "Data engineering", label: "Data Engineering" },
    { id: "Cybersecurity", label: "Cybersecurity" },
    { id: "Blockchain", label: "Blockchain" },
    { id: "AR/VR", label: "AR/VR" },
    { id: "Game development", label: "Game Development" },
    { id: "IoT", label: "Internet of Things" },
    { id: "Embedded systems", label: "Embedded Systems" },
    { id: "Fintech", label: "Financial Technology" },
    { id: "Healthtech", label: "Healthcare Technology" },
    { id: "Edtech", label: "Educational Technology" }
  ];

  const educationLevels: Option[] = [
    { id: "High School", label: "High School" },
    { id: "Associate's in Computer Science", label: "Associate's in Computer Science" },
    { id: "Bachelor's in Computer Science", label: "Bachelor's in Computer Science" },
    { id: "Bachelor's in Information Technology", label: "Bachelor's in Information Technology" },
    { id: "Bachelor's in Software Engineering", label: "Bachelor's in Software Engineering" },
    { id: "Master's in Computer Science", label: "Master's in Computer Science" },
    { id: "Master's in Information Technology", label: "Master's in Information Technology" },
    { id: "PhD in Computer Science", label: "PhD in Computer Science" },
    { id: "Self-taught", label: "Self-taught" },
    { id: "Bootcamp", label: "Bootcamp Graduate" }
  ];

  const handleSkillChange = (id: string): void => {
    setFormData(prev => {
      const newSkills = prev.skills.includes(id)
        ? prev.skills.filter(skill => skill !== id)
        : [...prev.skills, id];
      return { ...prev, skills: newSkills };
    });
  };

  const handleInterestChange = (id: string): void => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(id)
        ? prev.interests.filter(interest => interest !== id)
        : [...prev.interests, id];
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Combine all input into one sentence to match the Python backend
      const combinedInput = `Skills: ${formData.skills.join(', ')}
Education: ${formData.education}
Interests: ${formData.interests.join(', ')}
Preferred location: ${formData.preferredLocation}
Experience: ${formData.experience}
Salary expectation: $${formData.salaryExpectation[0]}`;
      
      console.log("Sending profile to backend:", combinedInput);
      
      // Replace with your actual API endpoint
      const response = await fetch('/api/job-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          student_profile: combinedInput 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }
      
      const data: ApiResponse = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Software Engineering Job Recommendation</CardTitle>
          <CardDescription>Fill out this form to get personalized job recommendations based on your skills and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Technical Skills */}
            <div>
              <Label className="block mb-2">Technical Skills</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border rounded-md p-3 max-h-60 overflow-y-auto">
                {availableSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`skill-${skill.id}`} 
                      checked={formData.skills.includes(skill.id)}
                      onCheckedChange={() => handleSkillChange(skill.id)}
                    />
                    <Label htmlFor={`skill-${skill.id}`}>{skill.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Education */}
            <div>
              <Label htmlFor="education">Education</Label>
              <Select 
                value={formData.education} 
                onValueChange={(value) => setFormData({...formData, education: value})}
              >
                <SelectTrigger id="education">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((edu) => (
                    <SelectItem key={edu.id} value={edu.id}>{edu.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Experience */}
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Select 
                value={formData.experience} 
                onValueChange={(value) => setFormData({...formData, experience: value})}
              >
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Interests */}
            <div>
              <Label className="block mb-2">Areas of Interest</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border rounded-md p-3 max-h-60 overflow-y-auto">
                {interestAreas.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`interest-${interest.id}`} 
                      checked={formData.interests.includes(interest.id)}
                      onCheckedChange={() => handleInterestChange(interest.id)}
                    />
                    <Label htmlFor={`interest-${interest.id}`}>{interest.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location Preference */}
            <div>
              <Label htmlFor="location">Preferred Location</Label>
              <Input 
                id="location" 
                placeholder="Remote, New York, San Francisco, etc." 
                value={formData.preferredLocation}
                onChange={(e) => setFormData({...formData, preferredLocation: e.target.value})}
              />
            </div>
            
            {/* Salary Expectations */}
            <div>
              <Label className="block mb-2">
                Salary Expectation: ${formData.salaryExpectation[0].toLocaleString()}
              </Label>
              <Slider 
                min={30000} 
                max={200000} 
                step={5000} 
                value={formData.salaryExpectation}
                onValueChange={(value) => setFormData({...formData, salaryExpectation: value})}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Finding recommendations...
              </>
            ) : (
              "Get Job Recommendations"
            )}
          </Button>
          
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {result && result.recommendations && (
            <div className="space-y-4 w-full">
              <h3 className="text-lg font-medium">Job Recommendations</h3>
              {result.recommendations.map((job, index) => (
                <Card key={index} className="w-full">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">{job.title}</h4>
                        <p className="text-gray-500">{job.company}</p>
                        {job.salary && (
                          <p className="text-sm mt-1">Salary: ${job.salary.toLocaleString()}</p>
                        )}
                      </div>
                      <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                        {job.match_score}% match
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}