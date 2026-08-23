import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  MapPin,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  ArrowRight,
  Shield,
  X,
  RefreshCw,
  Search,
  Compass,
  FileCheck,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import PageHeader from '../../components/common/PageHeader';
import { analyzeComplaintText, calculatePriorityScore, checkDuplicateReports } from '../../utils/aiEngine';
import { MOCK_CITIZEN_COMPLAINTS } from './CitizenDashboard';

const CATEGORIES = [
  'Garbage & Waste',
  'Road Infrastructure & Potholes',
  'Electrical & Streetlights',
  'Water Supply & Sewage',
  'Drainage & Flooding',
  'Other Civic Concern',
];

export default function ReportComplaint() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    description: '',
    location: '4th Cross, Indiranagar',
    ward: 'Ward 14 (Indiranagar)',
    urgency: 'Medium',
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [aiSuggestedCategory, setAiSuggestedCategory] = useState(null);
  const [aiScore, setAiScore] = useState(65);
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Recalculate AI score & check duplicates on change
  useEffect(() => {
    const score = calculatePriorityScore({
      category: formData.category,
      urgencyLevel: formData.urgency,
      title: formData.title,
      description: formData.description,
    });
    setAiScore(score);

    if (formData.description.length > 10) {
      const aiAnalysis = analyzeComplaintText(`${formData.title} ${formData.description}`);
      if (aiAnalysis.confidenceScore > 60 && aiAnalysis.suggestedCategory !== formData.category) {
        setAiSuggestedCategory(aiAnalysis.suggestedCategory);
      } else {
        setAiSuggestedCategory(null);
      }
    }

    if (formData.location.length > 5) {
      const dup = checkDuplicateReports(formData, MOCK_CITIZEN_COMPLAINTS);
      setDuplicateWarning(dup.isDuplicate ? dup : null);
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFileName(file.name);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageFileName('');
  };

  const handleSimulateGPS = () => {
    setIsLocating(true);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        location: 'MG Road Metro Exit, Ward 12',
        ward: 'Ward 12 (MG Road Sector)',
      }));
      setIsLocating(false);
    }, 600);
  };

  const applyAiCategory = () => {
    if (aiSuggestedCategory) {
      setFormData((prev) => ({ ...prev, category: aiSuggestedCategory }));
      setAiSuggestedCategory(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `CC-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTicket = {
        id: generatedId,
        title: formData.title,
        category: formData.category,
        location: formData.location,
        ward: formData.ward,
        urgency: formData.urgency,
        priorityScore: aiScore,
        officer: 'S. Ramesh (Sanitation & Works Inspector)',
        date: new Date().toISOString().split('T')[0],
      };
      setSubmittedTicket(newTicket);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* HEADER */}
      <PageHeader
        title="Report a Civic Issue"
        description="Fill out the complaint details, attach photo evidence, and pinpoint location. Our AI engine auto-scores urgency and dispatches the task."
        breadcrumbs={[
          { label: 'Citizen Portal', href: '/citizen/dashboard' },
          { label: 'Report Issue' },
        ]}
        badge={<Badge variant="primary">AI Smart Processing</Badge>}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* STEP 1: COMPLAINT DETAILS */}
        <Card title="1. Issue Details & Category" subtitle="Be descriptive for faster officer dispatch">
          <div className="space-y-4">
            <Input
              label="Complaint Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Broken streetlight causing dark alley hazard"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Issue Category"
                  type="select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={CATEGORIES}
                  required
                />
                {aiSuggestedCategory && (
                  <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      AI Suggestion: <strong>{aiSuggestedCategory}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={applyAiCategory}
                      className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-900"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              <Input
                label="Urgency Level"
                type="select"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                options={[
                  { label: 'Low - Routine Maintenance', value: 'Low' },
                  { label: 'Medium - Needs Attention Soon', value: 'Medium' },
                  { label: 'High - Urgent Hazard / Danger', value: 'High' },
                ]}
                required
              />
            </div>

            <Input
              label="Detailed Description"
              type="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the issue (landmarks, safety risks, duration)..."
              required
            />

            {/* AI Real-time Priority Preview Card */}
            <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Real-time AI Priority Score:</span>
                <span className="font-mono font-extrabold text-emerald-400 text-sm">{aiScore}/100</span>
              </div>
              <Badge variant={aiScore > 75 ? 'danger' : aiScore > 50 ? 'warning' : 'success'} size="sm">
                {aiScore > 75 ? 'High Priority' : aiScore > 50 ? 'Medium Priority' : 'Standard'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* STEP 2: LOCATION & GEO-TAGGING */}
        <Card title="2. Location & Geo-Tagging" subtitle="Specify address and ward zone" headerIcon={MapPin}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Street Address / Landmark"
                name="location"
                icon={MapPin}
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Near Community Hall, Ward 14"
                required
              />

              <Input
                label="Zonal Ward Sector"
                type="select"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                options={[
                  'Ward 14 (Indiranagar)',
                  'Ward 12 (MG Road Sector)',
                  'Ward 08 (Lakeview West)',
                  'Ward 03 (Central Market Zone)',
                ]}
                required
              />
            </div>

            {/* Simulated GPS Button */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Compass className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong>GPS Auto-Detect Location</strong>
                  <p className="text-slate-500 text-[11px]">Pinpoint current device location coordinates</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSimulateGPS}
                isLoading={isLocating}
                icon={RefreshCw}
              >
                Detect GPS Location
              </Button>
            </div>

            {/* DUPLICATE REPORT ALERT */}
            {duplicateWarning && (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3 text-xs text-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Possible Duplicate Report Detected!</strong>
                  <p className="mt-0.5">
                    An existing active complaint (<strong>{duplicateWarning.masterTicketId}</strong>: "{duplicateWarning.existingTitle}") is registered within {duplicateWarning.distanceMetres}m. Submitting will link your report to strengthen priority!
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* STEP 3: PHOTO EVIDENCE */}
        <Card title="3. Upload Photo Evidence" subtitle="Image uploads speed up field verification" headerIcon={ImageIcon}>
          <div className="space-y-4">
            {!selectedImage ? (
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-8 text-center bg-slate-50/50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Drag & drop photo here or click to browse</h4>
                  <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP up to 10MB</p>
                </div>
              </div>
            ) : (
              <div className="relative bg-slate-900 text-white rounded-xl p-4 max-w-sm mx-auto text-center space-y-3">
                <img src={selectedImage} alt="Uploaded Issue" className="max-h-48 rounded-lg mx-auto object-cover" />
                <div className="flex items-center justify-between text-xs px-2">
                  <span className="text-slate-300 truncate max-w-[200px]">{imageFileName}</span>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" size="lg" onClick={() => navigate('/citizen/dashboard')}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            icon={ArrowRight}
            iconPosition="right"
          >
            Submit Complaint
          </Button>
        </div>

      </form>

      {/* SUCCESS CONFIRMATION MODAL */}
      {submittedTicket && (
        <Modal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/citizen/dashboard');
          }}
          title="Complaint Logged Successfully!"
          subtitle={`Ticket ID: ${submittedTicket.id}`}
          primaryAction={{
            label: 'View My Complaints',
            onClick: () => {
              setShowSuccessModal(false);
              navigate('/citizen/complaints');
            },
          }}
        >
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-xs text-slate-600">
              Your report has been received and processed by the AI dispatch engine.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl text-left text-xs space-y-2 border border-slate-200">
              <div><strong>Title:</strong> {submittedTicket.title}</div>
              <div><strong>Category:</strong> {submittedTicket.category}</div>
              <div><strong>Ward Location:</strong> {submittedTicket.location}</div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                <span>AI Priority Score: <strong className="text-emerald-700">{submittedTicket.priorityScore}/100</strong></span>
                <Badge variant="primary" size="sm">Assigned: {submittedTicket.officer}</Badge>
              </div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
