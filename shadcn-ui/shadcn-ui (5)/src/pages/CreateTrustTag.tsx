import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, Camera, Video, FileText, CheckCircle, Hammer, ChefHat, Wrench, Laptop, Sprout, Heart, MessageCircle, Briefcase, Brain, Award, Monitor, Calculator, Truck, Car, TrendingUp, BarChart3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const skillCategories = [
  {
    id: 'accounting',
    title: 'Accounting & Finance',
    icon: Calculator,
    color: 'bg-green-100 text-green-600',
    skills: [
      'Financial Accounting', 'Managerial Accounting', 'Bookkeeping', 'Accounts Payable/Receivable',
      'Payroll Processing', 'Tax Preparation', 'QuickBooks', 'Xero', 'FreshBooks',
      'Financial Reporting', 'Budget Forecasting', 'Cash Flow Management', 'Cost Accounting',
      'Audit & Compliance Basics', 'Financial Statement Analysis', 'GAAP/IFRS Knowledge',
      'Excel for Accounting'
    ]
  },
  {
    id: 'investing',
    title: 'Investing & Markets',
    icon: TrendingUp,
    color: 'bg-emerald-100 text-emerald-600',
    skills: [
      'Stock Market Fundamentals', 'Portfolio Management', 'Investment Research & Analysis',
      'Equity Valuation (DCF, P/E, DDM)', 'Technical Analysis & Charting', 'Fundamental Analysis',
      'ETF & Mutual Fund Strategies', 'Cryptocurrency Investing', 'Real Estate Investing',
      'Retirement Planning', 'Risk Management', 'Behavioral Finance', 'ESG/Sustainable Investing',
      'Financial Modeling'
    ]
  },
  {
    id: 'data',
    title: 'Data Analytics & Business Intelligence',
    icon: BarChart3,
    color: 'bg-blue-100 text-blue-600',
    skills: [
      'Data Analytics Fundamentals', 'Excel (Intermediate to Advanced)', 'Google Sheets Analytics',
      'SQL for Data Analysis', 'Python for Data Analytics', 'Power BI', 'Tableau',
      'Looker Studio (Google Data Studio)', 'Data Visualization Principles', 'Statistics for Business',
      'Regression Analysis', 'Predictive Analytics', 'Financial Data Modeling', 'Dashboard Design',
      'Business Reporting'
    ]
  },
  {
    id: 'business',
    title: 'Business & Strategy',
    icon: Briefcase,
    color: 'bg-purple-100 text-purple-600',
    skills: [
      'Business Management', 'Business Planning', 'Entrepreneurship', 'Business Law Basics',
      'Project Management (Agile, Scrum)', 'Process Improvement/Lean Six Sigma', 'Operations Management',
      'Strategic Planning', 'Leadership & Team Coordination', 'Negotiation Skills',
      'Supply Chain Management', 'Business Communication', 'Client Relations/Customer Success'
    ]
  },
  {
    id: 'technology',
    title: 'Technology & Tools',
    icon: Monitor,
    color: 'bg-cyan-100 text-cyan-600',
    skills: [
      'Microsoft Excel (Expert)', 'Google Workspace (Sheets, Docs, Forms)', 'Notion/Airtable',
      'PowerPoint/Pitch Deck Design', 'Python (Beginner/Intermediate)', 'R Programming',
      'JavaScript (Basic to Intermediate)', 'HTML/CSS (Web Basics)', 'SQL Database Management',
      'Data Cleaning/Transformation', 'Automation with Zapier/Make', 'API Integration Basics'
    ]
  },
  {
    id: 'soft',
    title: 'Cross-Industry & Soft Skills',
    icon: Brain,
    color: 'bg-pink-100 text-pink-600',
    skills: [
      'Professional Communication', 'Report Writing', 'Time Management',
      'Problem Solving & Critical Thinking', 'Ethical Decision-Making',
      'Remote Collaboration Tools (Slack, Trello, Asana)', 'Cross-Cultural Communication',
      'Bilingual/Multilingual Proficiency', 'Adaptability/Learning Agility', 'Digital Literacy'
    ]
  },
  {
    id: 'compliance',
    title: 'Compliance, Audit & Risk',
    icon: MessageCircle,
    color: 'bg-amber-100 text-amber-600',
    skills: [
      'Risk Assessment', 'Internal Controls', 'Fraud Detection', 'AML (Anti-Money Laundering)',
      'KYC (Know Your Customer)', 'Corporate Governance', 'Financial Regulation (SEC/FINRA Basics)',
      'Audit Documentation', 'SOX Compliance', 'Forensic Accounting'
    ]
  },
  {
    id: 'trades',
    title: 'Skilled Trades & Construction',
    icon: Hammer,
    color: 'bg-orange-100 text-orange-600',
    skills: [
      'Carpenter', 'Electrician', 'Plumber', 'HVAC Technician', 'Welder',
      'Tile Installer', 'Roofer', 'Drywall Installer', 'Painter', 'Flooring Installer',
      'Mason', 'Concrete Worker', 'Heavy Equipment Operator', 'Forklift Operator',
      'Construction Laborer', 'Handyman', 'Appliance Repair Technician', 'Locksmith'
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Wellness',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
    skills: [
      'Certified Nursing Assistant (CNA)', 'Medical Assistant', 'Pharmacy Technician',
      'Physical Therapist Assistant', 'Dental Assistant', 'Medical Receptionist',
      'Home Health Aide', 'Patient Care Technician', 'Phlebotomist', 'EMT',
      'Massage Therapist', 'Personal Trainer', 'Fitness Instructor', 'Yoga Instructor',
      'Peer Recovery Specialist', 'Mental Health Aide'
    ]
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Food Service',
    icon: ChefHat,
    color: 'bg-yellow-100 text-yellow-600',
    skills: [
      'Cook', 'Line Cook', 'Prep Cook', 'Baker', 'Server', 'Bartender', 'Barista',
      'Restaurant Manager', 'Food Service Worker', 'Dishwasher', 'Host/Hostess',
      'Hotel Front Desk Agent', 'Housekeeper', 'Event Coordinator', 'Catering Assistant',
      'Food Safety Manager', 'Kitchen Manager'
    ]
  },
  {
    id: 'transportation',
    title: 'Transportation & Logistics',
    icon: Truck,
    color: 'bg-indigo-100 text-indigo-600',
    skills: [
      'Truck Driver (CDL)', 'Delivery Driver', 'Uber/Lyft Driver', 'Taxi Driver',
      'Bus Driver', 'Warehouse Supervisor', 'Logistics Coordinator', 'Dispatcher',
      'Moving Company Worker', 'Courier', 'Package Handler', 'Valet'
    ]
  },
  {
    id: 'automotive',
    title: 'Automotive & Mechanical',
    icon: Car,
    color: 'bg-slate-100 text-slate-600',
    skills: [
      'Automotive Technician', 'Mechanic', 'Oil Change Technician', 'Tire Technician',
      'Auto Body Repair', 'Automotive Detailer', 'Parts Counter Person',
      'Tow Truck Operator', 'Small Engine Repair', 'Motorcycle Mechanic'
    ]
  }
];

const microCerts = [
  'Proven Driver', 'Proven Food Service Worker', 'Proven Healthcare Assistant',
  'Proven Construction Worker', 'Proven Customer Service Rep', 'Proven Sales Associate',
  'Proven Administrative Assistant', 'Proven Maintenance Tech', 'Proven Warehouse Worker',
  'Proven Security Officer', 'Proven Childcare Provider', 'Proven Housekeeper',
  'Proven Landscaper', 'Proven Retail Associate', 'Proven Delivery Driver'
];

export default function CreateTrustTag() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [customSkill, setCustomSkill] = useState('');
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleSkillSelect = (skill: string) => {
    setSelectedSkill(skill);
    setShowAssessment(true);
    setAssessmentStep(1);
    setAnswers({});
  };

  const handleCustomSkillSubmit = () => {
    if (customSkill.trim()) {
      setSelectedSkill(customSkill);
      setShowAssessment(true);
      setAssessmentStep(1);
      setAnswers({});
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const getAssessmentQuestions = (skill: string) => {
    const skillAssessments: Record<string, any[]> = {
      'Google Workspace (Sheets, Docs, Forms)': [
        { id: 1, question: 'In Google Sheets, how do you create a dropdown list in a cell?', type: 'select', options: ['Data > Data validation > Criteria: List of items', 'Insert > Dropdown menu', 'Format > Conditional formatting > Dropdown', 'Tools > Create dropdown'] },
        { id: 2, question: 'What is the correct formula to sum values in Google Sheets column A where column B contains "Sales"?', type: 'select', options: ['=SUMIF(B:B,"Sales",A:A)', '=SUM(A:A,B:B="Sales")', '=SUMIFS(A:A,"Sales",B:B)', '=SUM(A:A WHERE B:B="Sales")'] },
        { id: 3, question: 'In Google Docs, how do you insert a table of contents that updates automatically?', type: 'select', options: ['Insert > Table of contents > With page numbers', 'Format > Table of contents > Auto-update', 'Tools > Table of contents > Dynamic', 'Insert > Break > Table of contents'] },
        { id: 4, question: 'How do you share a Google Doc with "Comment only" permissions?', type: 'select', options: ['Share > Add people > Commenter', 'File > Share > Comment access', 'Tools > Sharing > Comment mode', 'Edit > Permissions > Comments only'] },
        { id: 5, question: 'In Google Forms, how do you make a question required?', type: 'select', options: ['Click the "Required" toggle switch at bottom right of question', 'Right-click question > Make required', 'Settings > Required questions > Select question', 'Format > Question settings > Required'] },
        { id: 6, question: 'What keyboard shortcut freezes the first row in Google Sheets?', type: 'select', options: ['View > Freeze > 1 row', 'Ctrl+Alt+Shift+F', 'Format > Freeze > Top row', 'Select row 2, then View > Freeze rows'] },
        { id: 7, question: 'In Google Docs, how do you suggest edits instead of directly editing?', type: 'select', options: ['Click the pencil icon and select "Suggesting"', 'Tools > Suggestion mode', 'Edit > Switch to suggesting', 'View > Mode > Suggestions'] },
        { id: 8, question: 'How do you create a pivot table in Google Sheets?', type: 'select', options: ['Insert > Pivot table', 'Data > Pivot table', 'Tools > Create pivot table', 'Format > Pivot table'] },
        { id: 9, question: 'In Google Forms, how do you set up conditional logic (show questions based on previous answers)?', type: 'select', options: ['Click three dots on question > Go to section based on answer', 'Settings > Logic > Conditional questions', 'Tools > Question logic > If/then', 'Format > Conditional display'] },
        { id: 10, question: 'How do you protect a range of cells in Google Sheets from being edited?', type: 'select', options: ['Data > Protect sheets and ranges', 'Format > Protect cells', 'Tools > Protection > Select range', 'Right-click > Protect range'] }
      ],
      'Excel (Intermediate to Advanced)': [
        { id: 1, question: 'What formula would you use to look up a value in the leftmost column and return a value from the 3rd column to the right?', type: 'select', options: ['=VLOOKUP(lookup_value, table_array, 3, FALSE)', '=HLOOKUP(lookup_value, table_array, 3, FALSE)', '=INDEX(MATCH(lookup_value, array, 3))', '=LOOKUP(lookup_value, array, 3)'] },
        { id: 2, question: 'How do you create an absolute reference for cell A1 that won\'t change when copied?', type: 'select', options: ['$A$1', 'A$1$', '&A&1', '#A#1'] },
        { id: 3, question: 'What does the SUMIFS function do that SUMIF cannot?', type: 'select', options: ['Sum based on multiple criteria', 'Sum only positive numbers', 'Sum across multiple sheets', 'Sum with text criteria only'] },
        { id: 4, question: 'How do you create a pivot table from data in range A1:D100?', type: 'select', options: ['Select A1:D100, then Insert > PivotTable', 'Data > PivotTable > Select range', 'Tools > Create PivotTable', 'Format > PivotTable > New'] },
        { id: 5, question: 'What keyboard shortcut applies AutoFilter to your data?', type: 'select', options: ['Ctrl+Shift+L', 'Ctrl+Alt+F', 'Ctrl+Shift+F', 'Alt+D+F'] },
        { id: 6, question: 'How do you remove duplicates from a dataset in Excel?', type: 'select', options: ['Data > Remove Duplicates', 'Format > Remove Duplicates', 'Tools > Data Cleanup > Duplicates', 'Edit > Find & Replace > Duplicates'] },
        { id: 7, question: 'What does the INDEX/MATCH combination allow you to do that VLOOKUP cannot?', type: 'select', options: ['Look left of the lookup column and handle column insertions better', 'Work with text values only', 'Sum values instead of returning them', 'Work only with numbers'] },
        { id: 8, question: 'How do you create a data validation dropdown list in Excel?', type: 'select', options: ['Data > Data Validation > Allow: List', 'Insert > Dropdown > List', 'Format > Conditional Formatting > List', 'Tools > Validation > Dropdown'] },
        { id: 9, question: 'What does Ctrl+Shift+Enter do when entering a formula?', type: 'select', options: ['Creates an array formula', 'Makes the formula absolute', 'Copies the formula down', 'Validates the formula syntax'] },
        { id: 10, question: 'How do you freeze both the first row and first column in Excel?', type: 'select', options: ['Select cell B2, then View > Freeze Panes', 'View > Freeze Panes > Freeze First Row and Column', 'Format > Freeze > Row and Column', 'Select A1, then Window > Freeze'] }
      ],
      'QuickBooks': [
        { id: 1, question: 'When setting up a new company in QuickBooks, what should you do FIRST?', type: 'select', options: ['Enter company information and fiscal year', 'Import customer list', 'Set up chart of accounts', 'Create first invoice'] },
        { id: 2, question: 'How do you record a customer payment against an existing invoice in QuickBooks?', type: 'select', options: ['Customers > Receive Payments > Select invoice', 'Banking > Make Deposits > Customer payment', 'Sales > Create Invoice > Mark as paid', 'Accounting > Record Payment'] },
        { id: 3, question: 'What is the correct way to handle a customer who pays $800 on a $1000 invoice?', type: 'select', options: ['Record $800 payment and leave $200 as open balance', 'Write off the $200 difference immediately', 'Create a new invoice for $200', 'Delete the original invoice and create new $800 invoice'] },
        { id: 4, question: 'How do you reconcile your bank account in QuickBooks?', type: 'select', options: ['Banking > Reconcile > Enter statement ending balance and date', 'Reports > Banking > Reconciliation', 'Accounting > Bank Reconciliation > Import statement', 'Tools > Reconcile > Match transactions'] },
        { id: 5, question: 'What is the purpose of the "Undeposited Funds" account in QuickBooks?', type: 'select', options: ['Holds customer payments until you make a bank deposit', 'Tracks petty cash transactions', 'Records uncollectible accounts', 'Holds vendor payments before they clear'] },
        { id: 6, question: 'How do you set up sales tax in QuickBooks?', type: 'select', options: ['Taxes > Sales Tax > Set up sales tax', 'Items > New Item > Sales Tax Item', 'Company > Sales Tax > Enable', 'Setup > Tax Settings > Sales Tax'] },
        { id: 7, question: 'What report would you run to see which customers owe you money?', type: 'select', options: ['A/R Aging Summary', 'Customer Balance Summary', 'Sales by Customer Summary', 'Open Invoices Report'] },
        { id: 8, question: 'How do you handle a vendor bill that you received but haven\'t paid yet?', type: 'select', options: ['Expenses > Enter Bills', 'Banking > Write Checks > Mark as unpaid', 'Vendors > Create Bill', 'Accounting > Accounts Payable > New Bill'] },
        { id: 9, question: 'What\'s the difference between "Items" and "Accounts" in QuickBooks?', type: 'select', options: ['Items are what you sell, Accounts are where transactions are recorded', 'Items are for inventory, Accounts are for services', 'Items are income, Accounts are expenses', 'No difference, they\'re the same thing'] },
        { id: 10, question: 'How do you void a check in QuickBooks without deleting the transaction record?', type: 'select', options: ['Find the check, right-click > Void', 'Banking > Void Check > Select check number', 'Edit the check and change amount to $0.00', 'Reports > Find check > Mark as void'] }
      ],
      'Power BI': [
        { id: 1, question: 'What DAX function would you use to calculate total sales for the current year up to today\'s date?', type: 'select', options: ['TOTALYTD(Sales[Amount], Calendar[Date])', 'SUMYTD(Sales[Amount], Calendar[Date])', 'CALCULATE(SUM(Sales[Amount]), DATESYTD(Calendar[Date]))', 'YEARTODATE(SUM(Sales[Amount]))'] },
        { id: 2, question: 'How do you create a calculated column that shows "High" if sales > 1000, otherwise "Low"?', type: 'select', options: ['IF(Sales[Amount] > 1000, "High", "Low")', 'SWITCH(Sales[Amount] > 1000, "High", "Low")', 'CASE WHEN Sales[Amount] > 1000 THEN "High" ELSE "Low"', 'IIF(Sales[Amount] > 1000, "High", "Low")'] },
        { id: 3, question: 'What is the difference between a calculated column and a measure in Power BI?', type: 'select', options: ['Calculated columns are stored and computed row-by-row, measures are dynamic and computed based on filter context', 'Calculated columns are faster than measures', 'Measures can only use SUM, calculated columns can use any function', 'No difference, they work the same way'] },
        { id: 4, question: 'How do you create a relationship between two tables in Power BI?', type: 'select', options: ['Model view > Drag from one table\'s field to another table\'s field', 'Data view > Relationships > New relationship', 'Transform data > Merge tables', 'Home > Manage relationships > New'] },
        { id: 5, question: 'What does the CALCULATE function do in DAX?', type: 'select', options: ['Modifies filter context for an expression', 'Performs mathematical calculations', 'Calculates running totals', 'Creates calculated columns'] },
        { id: 6, question: 'How do you implement Row Level Security (RLS) in Power BI?', type: 'select', options: ['Model view > Manage roles > Create role with DAX filter', 'Security > Row filters > Apply to tables', 'Data view > Security > User permissions', 'Transform data > Security > Row level'] },
        { id: 7, question: 'What Power Query function would you use to remove duplicate rows?', type: 'select', options: ['Table.Distinct()', 'Remove Duplicates from Home ribbon', 'Table.RemoveDuplicates()', 'Data.Deduplicate()'] },
        { id: 8, question: 'How do you create a measure that shows sales for the previous month?', type: 'select', options: ['CALCULATE(SUM(Sales[Amount]), PREVIOUSMONTH(Calendar[Date]))', 'SUM(Sales[Amount]) - 1 MONTH', 'DATEADD(SUM(Sales[Amount]), -1, MONTH)', 'PREVIOUSMONTH(SUM(Sales[Amount]))'] },
        { id: 9, question: 'What visualization would you use to show the relationship between two continuous variables?', type: 'select', options: ['Scatter chart', 'Line chart', 'Bar chart', 'Pie chart'] },
        { id: 10, question: 'How do you refresh a dataset in Power BI Service?', type: 'select', options: ['Dataset settings > Schedule refresh or Refresh now', 'Reports > Refresh data', 'Workspace > Update dataset', 'Data gateway > Manual refresh'] }
      ],
      'Truck Driver (CDL)': [
        { id: 1, question: 'What is the maximum driving time allowed in a 14-hour on-duty period under HOS rules?', type: 'select', options: ['11 hours', '10 hours', '8 hours', '12 hours'] },
        { id: 2, question: 'How many points of contact should you maintain when entering/exiting your truck?', type: 'select', options: ['3 points of contact (two hands and one foot, or two feet and one hand)', '2 points of contact', '4 points of contact', 'As many as possible'] },
        { id: 3, question: 'What should you do FIRST when conducting a pre-trip inspection?', type: 'select', options: ['Check that parking brakes are set and wheels are chocked', 'Start the engine and check gauges', 'Walk around the vehicle', 'Check tire pressure'] },
        { id: 4, question: 'At what PSI should the low air pressure warning signal activate?', type: 'select', options: ['60 PSI or below', '40 PSI or below', '80 PSI or below', '100 PSI or below'] },
        { id: 5, question: 'What is the proper following distance for a truck traveling 55 mph in good conditions?', type: 'select', options: ['6-7 seconds', '3-4 seconds', '8-10 seconds', '2-3 seconds'] },
        { id: 6, question: 'When should you use your hazard lights while driving?', type: 'select', options: ['When driving significantly slower than traffic flow due to mechanical problems', 'When backing up', 'When turning left', 'When it\'s raining'] },
        { id: 7, question: 'What is "off-tracking" or "cheating" when turning?', type: 'select', options: ['When the rear wheels follow a shorter path than the front wheels', 'When you turn too sharply', 'When you don\'t signal properly', 'When you turn from the wrong lane'] },
        { id: 8, question: 'How often must you take a 30-minute break according to HOS rules?', type: 'select', options: ['Within 8 hours of coming on duty', 'Every 4 hours', 'Every 6 hours', 'Every 10 hours'] },
        { id: 9, question: 'What should you do if your brakes fail while driving?', type: 'select', options: ['Pump the brakes, downshift, use parking brake gradually, find escape route', 'Pull the parking brake immediately', 'Turn off the engine', 'Steer to the shoulder and stop'] },
        { id: 10, question: 'When backing up, what is the safest practice?', type: 'select', options: ['Get out and look (GOAL) before backing, use a spotter if available', 'Rely on mirrors only', 'Back up quickly to minimize time', 'Sound horn continuously while backing'] }
      ],
      'Cook': [
        { id: 1, question: 'What is the minimum internal temperature for cooking ground beef?', type: 'select', options: ['160°F (71°C)', '145°F (63°C)', '165°F (74°C)', '155°F (68°C)'] },
        { id: 2, question: 'How do you properly julienne a carrot?', type: 'select', options: ['Cut into 2-inch long matchsticks, 1/8 inch thick', 'Cut into small cubes', 'Cut into thin rounds', 'Cut diagonally into ovals'] },
        { id: 3, question: 'What does "mise en place" mean and why is it important?', type: 'select', options: ['Everything in its place - having all ingredients prepped and organized before cooking', 'A French cooking technique for sauces', 'The final plating of a dish', 'A method of inventory management'] },
        { id: 4, question: 'How long can cooked rice safely sit at room temperature?', type: 'select', options: ['2 hours maximum', '4 hours maximum', '6 hours maximum', '1 hour maximum'] },
        { id: 5, question: 'What is the correct way to test oil temperature for deep frying without a thermometer?', type: 'select', options: ['Drop a small piece of bread - it should sizzle immediately and brown in 60 seconds', 'Put your hand near the oil to feel heat', 'Wait for the oil to smoke', 'Drop water in to see if it bubbles'] },
        { id: 6, question: 'How do you properly sharpen a knife using a honing steel?', type: 'select', options: ['Hold steel vertically, draw knife down at 20-degree angle, alternating sides', 'Rub knife back and forth horizontally on steel', 'Hold knife still and move steel up and down', 'Use circular motions with the knife on steel'] },
        { id: 7, question: 'What is the first step when a grease fire starts on the stove?', type: 'select', options: ['Turn off heat source and cover pan with lid to smother flames', 'Pour water on the fire', 'Use flour to absorb the grease', 'Move the pan to the sink'] },
        { id: 8, question: 'How do you properly store raw chicken in the refrigerator?', type: 'select', options: ['Bottom shelf in a container to prevent drips, below 40°F', 'Top shelf to keep it coldest', 'Middle shelf with vegetables', 'Any shelf as long as it\'s covered'] },
        { id: 9, question: 'What does "al dente" mean when cooking pasta?', type: 'select', options: ['Firm to the bite - cooked through but still has slight resistance', 'Completely soft and mushy', 'Raw in the center', 'Overcooked and falling apart'] },
        { id: 10, question: 'How do you properly clean and sanitize a cutting board after cutting raw meat?', type: 'select', options: ['Wash with hot soapy water, then sanitize with bleach solution or sanitizer', 'Rinse with cold water only', 'Wipe with a damp cloth', 'Just wash with soap, no sanitizer needed'] }
      ],
      'Certified Nursing Assistant (CNA)': [
        { id: 1, question: 'What is the correct order for putting on PPE (Personal Protective Equipment)?', type: 'select', options: ['Gown, mask, goggles/face shield, gloves', 'Gloves, gown, mask, goggles', 'Mask, goggles, gown, gloves', 'Goggles, gloves, gown, mask'] },
        { id: 2, question: 'How often should you turn a bedridden patient to prevent pressure sores?', type: 'select', options: ['Every 2 hours', 'Every 4 hours', 'Every hour', 'Every 6 hours'] },
        { id: 3, question: 'What should you do FIRST if you find a patient on the floor?', type: 'select', options: ['Check for injuries and call for help - do not move the patient', 'Help them get back to bed immediately', 'Ask them what happened', 'Check their vital signs'] },
        { id: 4, question: 'How do you properly measure blood pressure manually?', type: 'select', options: ['Inflate cuff 20-30 mmHg above where pulse disappears, deflate slowly at 2-3 mmHg per second', 'Inflate to 200 mmHg and deflate quickly', 'Inflate until tight and deflate immediately', 'Inflate to 100 mmHg and listen for sounds'] },
        { id: 5, question: 'What is the normal range for adult respiratory rate?', type: 'select', options: ['12-20 breaths per minute', '8-12 breaths per minute', '20-30 breaths per minute', '6-10 breaths per minute'] },
        { id: 6, question: 'How should you assist a patient with ambulation who uses a walker?', type: 'select', options: ['Stay on their weaker side, let them set the pace, ensure walker is proper height', 'Walk behind them for safety', 'Hold their arm and guide them forward', 'Stay on their stronger side'] },
        { id: 7, question: 'What is the proper technique for hand hygiene in healthcare?', type: 'select', options: ['Wash for 20 seconds with soap and water, or use alcohol-based sanitizer for 15 seconds', 'Quick rinse with water', 'Wipe hands on clean towel', 'Use sanitizer for 5 seconds'] },
        { id: 8, question: 'How do you properly transfer a patient from bed to wheelchair?', type: 'select', options: ['Lock wheelchair brakes, lower bed, use gait belt, pivot on patient\'s stronger side', 'Lift patient directly into wheelchair', 'Slide patient from bed to chair', 'Use a mechanical lift for all transfers'] },
        { id: 9, question: 'What should you report immediately to the nurse?', type: 'select', options: ['Changes in patient condition, falls, medication errors, or patient complaints of pain', 'Only life-threatening emergencies', 'Everything you observe during your shift', 'Only what the patient specifically asks you to report'] },
        { id: 10, question: 'How do you properly collect a clean-catch urine specimen?', type: 'select', options: ['Clean genital area, start urinating, then collect midstream in sterile container', 'Collect any urine sample in any container', 'Collect the first urine of the day', 'Use a regular cup and transfer to specimen container'] }
      ],
      'Carpenter': [
        { id: 1, question: 'When framing a wall, what is the standard spacing for studs in residential construction?', type: 'select', options: ['16 inches on center', '12 inches on center', '24 inches on center', '18 inches on center'] },
        { id: 2, question: 'How do you properly measure and cut a 45-degree miter joint?', type: 'select', options: ['Measure length to long point, set miter saw to 45°, cut with good side up', 'Measure to short point and add 1/8 inch', 'Cut at 45° then sand to fit', 'Use a hand saw at approximate angle'] },
        { id: 3, question: 'What is the correct way to install drywall screws?', type: 'select', options: ['Drive screw head slightly below surface without breaking paper face', 'Drive flush with surface', 'Leave screw head above surface', 'Drive deep into stud'] },
        { id: 4, question: 'How do you check if a wall is plumb?', type: 'select', options: ['Use a 4-foot level vertically against the wall', 'Use a tape measure', 'Use a square', 'Eyeball it from across the room'] },
        { id: 5, question: 'What is the purpose of a vapor barrier in wall construction?', type: 'select', options: ['Prevent moisture from entering wall cavity from interior', 'Provide structural support', 'Improve insulation R-value', 'Prevent air leaks only'] },
        { id: 6, question: 'How do you properly nail two 2x4s together?', type: 'select', options: ['Use 16d nails, drive at slight angle (toenailing) or straight through', 'Use 8d nails straight through', 'Use screws only', 'Use construction adhesive only'] },
        { id: 7, question: 'What is the standard height for kitchen countertops?', type: 'select', options: ['36 inches from floor', '32 inches from floor', '38 inches from floor', '34 inches from floor'] },
        { id: 8, question: 'How do you properly cut with a circular saw?', type: 'select', options: ['Support both sides of cut, blade depth 1/4" below material, cut on waste side of line', 'Cut as fast as possible', 'Set blade to maximum depth', 'Cut from the good side of material'] },
        { id: 9, question: 'What does "16 on center" mean in construction?', type: 'select', options: ['16 inches from center of one stud to center of next stud', '16 studs per wall section', '16 inches from edge to edge', '16 feet total wall length'] },
        { id: 10, question: 'How do you properly install subflooring?', type: 'select', options: ['Apply construction adhesive to joists, install perpendicular to joists, stagger joints', 'Nail only, no adhesive needed', 'Install parallel to joists', 'Butt all joints together tightly'] }
      ],
      'Electrician': [
        { id: 1, question: 'What is the standard voltage for residential electrical service in the US?', type: 'select', options: ['240V single-phase, 120V to ground', '220V three-phase', '110V single-phase', '480V three-phase'] },
        { id: 2, question: 'What wire gauge is required for a 20-amp circuit?', type: 'select', options: ['12 AWG copper', '14 AWG copper', '10 AWG copper', '16 AWG copper'] },
        { id: 3, question: 'How do you properly test if a circuit is de-energized before working on it?', type: 'select', options: ['Use a non-contact voltage tester, then confirm with multimeter on known live circuit', 'Just turn off the breaker', 'Use only a non-contact tester', 'Ask someone else to check'] },
        { id: 4, question: 'What is the purpose of GFCI (Ground Fault Circuit Interrupter) protection?', type: 'select', options: ['Protect people from electrical shock by detecting ground faults', 'Prevent circuit overloads', 'Reduce electrical noise', 'Save energy'] },
        { id: 5, question: 'How high should electrical outlets be installed from the floor in residential construction?', type: 'select', options: ['12-18 inches to center of outlet', '6 inches to center of outlet', '24 inches to center of outlet', '36 inches to center of outlet'] },
        { id: 6, question: 'What is the correct way to splice electrical wires in a junction box?', type: 'select', options: ['Strip wires, twist together clockwise, secure with wire nut, tug test', 'Just twist wires together', 'Use electrical tape only', 'Solder and tape all connections'] },
        { id: 7, question: 'Where are GFCI outlets required in residential installations?', type: 'select', options: ['Bathrooms, kitchens, garages, outdoors, unfinished basements, within 6 feet of sinks', 'Only in bathrooms', 'Only outdoors', 'Everywhere in the house'] },
        { id: 8, question: 'What is the maximum number of 12 AWG wires allowed in a standard wire nut?', type: 'select', options: ['Depends on wire nut size - typically 2-4 wires for standard residential nuts', 'As many as will fit', 'Always exactly 3 wires', 'No more than 2 wires'] },
        { id: 9, question: 'How do you properly install a ceiling fan electrical box?', type: 'select', options: ['Use a fan-rated box securely fastened to structural member', 'Use any standard electrical box', 'Mount directly to drywall', 'Use the existing light fixture box'] },
        { id: 10, question: 'What is the purpose of the equipment grounding conductor (green/bare wire)?', type: 'select', options: ['Provide safe path for fault current back to electrical panel', 'Carry normal electrical current', 'Reduce electrical noise', 'Connect to water pipes'] }
      ]
    };

    return skillAssessments[skill] || [
      { id: 1, question: `What is the most important safety procedure when working in ${skill}?`, type: 'select', options: ['Follow established safety protocols and use proper PPE', 'Work as quickly as possible', 'Ask supervisor for every decision', 'Use the most expensive tools available'] },
      { id: 2, question: `What is the first step you should take when starting any ${skill} task?`, type: 'select', options: ['Assess the situation and plan your approach', 'Begin work immediately', 'Call for backup', 'Gather all possible tools'] },
      { id: 3, question: `How do you ensure quality results in ${skill}?`, type: 'select', options: ['Follow industry standards and double-check your work', 'Work as fast as possible', 'Use the most expensive materials', 'Copy what others are doing'] },
      { id: 4, question: `What should you do if you encounter a problem you haven\'t seen before in ${skill}?`, type: 'select', options: ['Stop work, research the issue, and consult with experienced colleagues', 'Guess and try different approaches', 'Ignore the problem and continue', 'Use more force or pressure'] },
      { id: 5, question: `What is the most critical skill for success in ${skill}?`, type: 'select', options: ['Attention to detail and following procedures', 'Physical strength', 'Speed of work', 'Having expensive tools'] },
      { id: 6, question: `How do you stay current with best practices in ${skill}?`, type: 'select', options: ['Continuing education, industry publications, and learning from experienced professionals', 'Trial and error', 'Social media only', 'Asking customers'] },
      { id: 7, question: `What is the proper way to handle mistakes in ${skill}?`, type: 'select', options: ['Acknowledge the mistake, assess impact, and correct it properly', 'Hide the mistake', 'Blame tools or materials', 'Rush to fix it without planning'] },
      { id: 8, question: `What documentation or records should you maintain in ${skill}?`, type: 'select', options: ['Work performed, materials used, safety incidents, and quality checks', 'No documentation needed', 'Only time worked', 'Only customer complaints'] },
      { id: 9, question: `How do you prioritize tasks when you have multiple ${skill} responsibilities?`, type: 'select', options: ['Safety first, then urgency, importance, and efficiency', 'Whatever is easiest first', 'Whatever pays the most first', 'Random order'] },
      { id: 10, question: `What is the key to building expertise in ${skill}?`, type: 'select', options: ['Consistent practice, learning from mistakes, and seeking feedback', 'Natural talent only', 'Expensive training courses', 'Working alone without guidance'] }
    ];
  };

  const renderAssessment = () => {
    if (!selectedSkill) return null;

    const questions = getAssessmentQuestions(selectedSkill);
    const currentQuestion = questions[assessmentStep - 1];
    const totalQuestions = questions.length;

    if (assessmentStep > totalQuestions) {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Skill Assessment Complete!</h3>
            <p className="text-gray-600 mb-6">
              You've completed all {totalQuestions} technical questions for {selectedSkill}. Upload work samples to support your TrustTag.
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Camera className="w-8 h-8 text-gray-400" />
                <Video className="w-8 h-8 text-gray-400" />
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                    Upload Work Samples
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-500 text-sm mt-2">
                  Photos, videos, certificates, or work examples
                </p>
              </div>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Uploaded Files ({uploadedFiles.length}):</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <Upload className="w-4 h-4" />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex space-x-4">
            <Button
              onClick={() => setShowAssessment(false)}
              variant="outline"
              className="flex-1"
            >
              Start Over
            </Button>
            <Button
              onClick={() => navigate('/checkout')}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Create TrustTag
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {selectedSkill} Technical Assessment
          </h3>
          <Badge variant="outline">
            Question {assessmentStep} of {totalQuestions}
          </Badge>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(assessmentStep / totalQuestions) * 100}%` }}
          ></div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">
            {currentQuestion.question}
          </h4>

          {currentQuestion.type === 'select' ? (
            <div className="space-y-2">
              {currentQuestion.options?.map((option: string, index: number) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={(e) => setAnswers(prev => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value
                    }))}
                    className="text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : currentQuestion.type === 'checkbox' ? (
            <div className="space-y-2">
              {currentQuestion.options?.map((option: string, index: number) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    value={option}
                    checked={answers[currentQuestion.id]?.includes(option) || false}
                    onChange={(e) => {
                      const currentAnswers = answers[currentQuestion.id]?.split(',') || [];
                      if (e.target.checked) {
                        const newAnswers = [...currentAnswers, option];
                        setAnswers(prev => ({
                          ...prev,
                          [currentQuestion.id]: newAnswers.join(',')
                        }));
                      } else {
                        const newAnswers = currentAnswers.filter(a => a !== option);
                        setAnswers(prev => ({
                          ...prev,
                          [currentQuestion.id]: newAnswers.join(',')
                        }));
                      }
                    }}
                    className="text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <Textarea
              placeholder="Please provide a detailed answer..."
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => setAnswers(prev => ({
                ...prev,
                [currentQuestion.id]: e.target.value
              }))}
              className="min-h-[120px]"
            />
          )}
        </div>

        <div className="flex space-x-4">
          <Button
            onClick={() => setAssessmentStep(prev => Math.max(1, prev - 1))}
            variant="outline"
            disabled={assessmentStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setAssessmentStep(prev => prev + 1)}
            disabled={!answers[currentQuestion.id]}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {assessmentStep === totalQuestions ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </div>
    );
  };

  if (showAssessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <Button
                onClick={() => setShowAssessment(false)}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Skills
              </Button>
            </div>

            <Card>
              <CardContent className="p-8">
                {renderAssessment()}
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Your TrustTag
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your skill area to begin a technical assessment. Each TrustTag tests your actual hands-on knowledge and professional competency.
            </p>
          </div>

          {/* Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {skillCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <CardDescription>
                      {category.skills.length} skills available
                    </CardDescription>
                  </CardHeader>
                  {selectedCategory === category.id && (
                    <CardContent>
                      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                        {category.skills.map((skill, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSkillSelect(skill);
                            }}
                            className="justify-start text-left h-auto p-2 hover:bg-blue-50"
                          >
                            {skill}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {/* MicroCert Quick Options */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Popular MicroCerts</span>
              </CardTitle>
              <CardDescription>
                Quick technical verification for common job roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {microCerts.map((cert, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 px-3 py-2"
                    onClick={() => handleSkillSelect(cert)}
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Skill Option */}
          <Card>
            <CardHeader>
              <CardTitle>Don't See Your Skill?</CardTitle>
              <CardDescription>
                Enter your skill and we'll create a technical assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder="Enter your skill (e.g., Dog Training, Jewelry Making, etc.)"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleCustomSkillSubmit}
                  disabled={!customSkill.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}