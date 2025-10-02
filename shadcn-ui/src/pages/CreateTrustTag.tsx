import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Brain, CheckCircle, Plus, ArrowRight, ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const skillCategories = [
  { 
    id: 'programming', 
    name: 'Programming & Development', 
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Java', 'C++', 'SQL', 'DevOps', 'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Angular', 'Vue.js', 'Django', 'Flask', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs'] 
  },
  { 
    id: 'design', 
    name: 'Design & Creative', 
    skills: ['UI/UX Design', 'Graphic Design', 'Adobe Creative Suite', 'Figma', 'Sketch', 'Video Editing', 'Animation', 'Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Premiere Pro', 'Blender', '3D Modeling', 'Web Design', 'Mobile App Design', 'Brand Design', 'Logo Design', 'Typography', 'Color Theory', 'Wireframing', 'Prototyping', 'User Research', 'Usability Testing'] 
  },
  { 
    id: 'marketing', 
    name: 'Marketing & Sales', 
    skills: ['Digital Marketing', 'SEO/SEM', 'Social Media', 'Content Marketing', 'Email Marketing', 'Sales Strategy', 'Google Ads', 'Facebook Ads', 'LinkedIn Marketing', 'Instagram Marketing', 'TikTok Marketing', 'Influencer Marketing', 'Affiliate Marketing', 'Marketing Analytics', 'Conversion Optimization', 'A/B Testing', 'Lead Generation', 'Customer Acquisition', 'Brand Management', 'Public Relations', 'Copywriting', 'Content Strategy', 'Marketing Automation', 'CRM Management'] 
  },
  { 
    id: 'business', 
    name: 'Business & Management', 
    skills: ['Project Management', 'Business Analysis', 'Leadership', 'Strategy', 'Operations', 'Finance', 'Agile/Scrum', 'Product Management', 'Business Development', 'Strategic Planning', 'Team Management', 'Change Management', 'Risk Management', 'Quality Assurance', 'Process Improvement', 'Consulting', 'Negotiation', 'Budgeting', 'Financial Analysis', 'Market Research', 'Competitive Analysis', 'Stakeholder Management', 'Vendor Management', 'Supply Chain'] 
  },
  { 
    id: 'data', 
    name: 'Data & Analytics', 
    skills: ['Data Science', 'Machine Learning', 'Statistics', 'Excel', 'Tableau', 'Power BI', 'R', 'Analytics', 'Python for Data', 'SQL Analytics', 'Big Data', 'Data Visualization', 'Predictive Analytics', 'Business Intelligence', 'Data Mining', 'Deep Learning', 'AI/ML', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'Jupyter', 'Apache Spark', 'Hadoop', 'ETL Processes', 'Data Warehousing', 'Statistical Modeling', 'A/B Testing Analytics'] 
  },
  { 
    id: 'healthcare', 
    name: 'Healthcare & Medical', 
    skills: ['Nursing', 'Medical Coding', 'Healthcare Administration', 'Patient Care', 'Medical Research', 'Pharmacy', 'Physical Therapy', 'Mental Health', 'Telemedicine', 'Healthcare IT', 'Medical Writing', 'Clinical Research', 'Healthcare Compliance', 'Medical Billing', 'Healthcare Quality', 'Public Health', 'Epidemiology', 'Medical Device', 'Healthcare Analytics', 'Electronic Health Records'] 
  },
  { 
    id: 'education', 
    name: 'Education & Training', 
    skills: ['Teaching', 'Curriculum Development', 'Educational Technology', 'Online Learning', 'Training Design', 'Learning Management Systems', 'Educational Assessment', 'Instructional Design', 'Adult Learning', 'Corporate Training', 'E-learning Development', 'Educational Research', 'Special Education', 'Language Teaching', 'STEM Education', 'Educational Leadership', 'Student Counseling', 'Academic Writing', 'Educational Psychology'] 
  },
  { 
    id: 'finance', 
    name: 'Finance & Accounting', 
    skills: ['Accounting', 'Financial Analysis', 'Investment Banking', 'Financial Planning', 'Tax Preparation', 'Auditing', 'Bookkeeping', 'QuickBooks', 'Excel Financial Modeling', 'Risk Assessment', 'Portfolio Management', 'Corporate Finance', 'Financial Reporting', 'Budget Analysis', 'Cost Accounting', 'Forensic Accounting', 'Credit Analysis', 'Insurance', 'Real Estate Finance', 'Cryptocurrency', 'Trading', 'Financial Compliance'] 
  },
  { 
    id: 'legal', 
    name: 'Legal & Compliance', 
    skills: ['Legal Research', 'Contract Law', 'Corporate Law', 'Intellectual Property', 'Employment Law', 'Compliance Management', 'Regulatory Affairs', 'Legal Writing', 'Litigation Support', 'Paralegal Services', 'Legal Technology', 'Privacy Law', 'Data Protection', 'GDPR Compliance', 'Legal Analysis', 'Document Review', 'Legal Project Management', 'Alternative Dispute Resolution', 'Immigration Law', 'Real Estate Law'] 
  },
  { 
    id: 'engineering', 
    name: 'Engineering & Technical', 
    skills: ['Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Software Engineering', 'Systems Engineering', 'Quality Engineering', 'Manufacturing', 'CAD Design', 'AutoCAD', 'SolidWorks', 'MATLAB', 'Technical Writing', 'Product Development', 'Process Engineering', 'Industrial Engineering', 'Environmental Engineering', 'Biomedical Engineering', 'Aerospace Engineering', 'Materials Science'] 
  },
  { 
    id: 'other', 
    name: 'Other Skills', 
    skills: [] 
  }
];

export default function CreateTrustTag() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
    portfolio: '',
    workSamples: [] as File[],
    skillDescription: '',
    achievements: '',
    certifications: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills(prev => [...prev, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, workSamples: [...prev.workSamples, ...files] }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workSamples: prev.workSamples.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Skills</h2>
              <p className="text-gray-600">Choose the skills you want to verify with your TrustTag</p>
            </div>

            {skillCategories.map(category => (
              <Card key={category.id} className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">{category.name}</h3>
                
                {category.id === 'other' ? (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter your custom skill"
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                      />
                      <Button onClick={addCustomSkill} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Don't see your skill listed? Add any custom skill you'd like to verify.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {category.skills.map(skill => (
                      <div
                        key={skill}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          selectedSkills.includes(skill)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleSkillToggle(skill)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{skill}</span>
                          {selectedSkills.includes(skill) && (
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            ))}

            {selectedSkills.length > 0 && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Selected Skills ({selectedSkills.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map(skill => (
                    <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800">
                      {skill}
                      <button
                        onClick={() => handleSkillToggle(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Work Samples</h2>
              <p className="text-gray-600">Showcase your best work to support your skill verification</p>
            </div>

            <Card className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Work</h3>
                <p className="text-gray-600 mb-4">
                  Upload portfolios, projects, certificates, or any files that demonstrate your skills
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Choose Files
                  </Button>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG, ZIP, RAR (Max 10MB each)
                </p>
              </div>

              {formData.workSamples.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
                  <div className="space-y-2">
                    {formData.workSamples.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Portfolio & Links</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="portfolio">Portfolio Website or LinkedIn Profile</Label>
                  <Input
                    id="portfolio"
                    placeholder="https://yourportfolio.com or https://linkedin.com/in/yourname"
                    value={formData.portfolio}
                    onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                  />
                </div>
              </div>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Skill Assessment</h2>
              <p className="text-gray-600">Answer questions to demonstrate your knowledge and expertise</p>
            </div>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Skill-Based Questions</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years (Beginner)</SelectItem>
                      <SelectItem value="2-3">2-3 years (Intermediate)</SelectItem>
                      <SelectItem value="4-6">4-6 years (Advanced)</SelectItem>
                      <SelectItem value="7+">7+ years (Expert)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="skillDescription">Describe Your Expertise</Label>
                  <Textarea
                    id="skillDescription"
                    placeholder="Describe your experience, key projects, and what makes you proficient in your selected skills..."
                    value={formData.skillDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, skillDescription: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="achievements">Key Achievements & Projects</Label>
                  <Textarea
                    id="achievements"
                    placeholder="List your most significant achievements, successful projects, or impact you've made..."
                    value={formData.achievements}
                    onChange={(e) => setFormData(prev => ({ ...prev, achievements: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="certifications">Certifications & Education</Label>
                  <Textarea
                    id="certifications"
                    placeholder="List relevant certifications, courses, degrees, or training programs..."
                    value={formData.certifications}
                    onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">AI Assessment Preview</h4>
              <p className="text-blue-800 text-sm">
                Based on your selected skills, our AI will generate personalized technical questions 
                and scenarios to verify your expertise. This helps employers trust your capabilities.
              </p>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Complete your profile to finalize your TrustTag</p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Review Your TrustTag</h3>
              <div className="space-y-3 text-sm">
                <div><strong>Selected Skills:</strong> {selectedSkills.join(', ')}</div>
                <div><strong>Work Samples:</strong> {formData.workSamples.length} files uploaded</div>
                <div><strong>Experience Level:</strong> {formData.experience}</div>
                <div><strong>Portfolio:</strong> {formData.portfolio || 'Not provided'}</div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <h4 className="font-medium text-blue-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Updated Pricing Options
              </h4>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-900">Single TrustTag – $7</p>
                  <p>Perfect for getting started with your first verification</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-200 relative">
                  <Badge className="absolute -top-2 -right-2 bg-green-600 text-white text-xs">
                    Save $3
                  </Badge>
                  <p className="font-semibold text-blue-900">3 TrustTags Pack – $18</p>
                  <p>Great value for multiple skill verifications</p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-200 relative">
                  <Badge className="absolute -top-2 -right-2 bg-green-600 text-white text-xs">
                    Save $5
                  </Badge>
                  <p className="font-semibold text-blue-900">5 TrustTags Pack – $30</p>
                  <p>Best savings for comprehensive skill portfolio</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="font-semibold text-purple-900">Business Plan – $299</p>
                  <p className="text-purple-800">For employers: 50 verifications + team dashboard</p>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Create Your TrustTag</h1>
            <Badge variant="outline">Step {currentStep} of {totalSteps}</Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-gray-600 mt-2">Single TrustTag – $7, 3 TrustTags Pack – $18 (save $3), 5 TrustTags Pack – $30 (save $5)</p>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={currentStep === 1 && selectedSkills.length === 0}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Link to="/checkout">
              <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                Proceed to Checkout
                <CheckCircle className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}