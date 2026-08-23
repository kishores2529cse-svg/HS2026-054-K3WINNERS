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
  Compass,
  FileCheck,
  Zap,
  Info,
  Layers,
  ChevronRight,
  ShieldAlert,
  ExternalLink,
  Lock,
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
  'Road Infrastructure & Potholes',
  'Garbage & Waste',
  'Electrical & Streetlights',
  'Water Supply & Sewage',
  'Drainage & Flooding',
  'Other Civic Concern',
];

// Quick 1-Click Demo Presets for instant testing
const DEMO_PRESETS = [
  {
    label: '🚨 Deep Pothole',
    title: 'Dangerous Deep Pothole near Metro Station Exit',
    category: 'Road Infrastructure & Potholes',
    urgency: 'High',
    description: 'A large, 8-inch deep crater on 100ft Road right after recent rains. Multiple two-wheelers skidding during night commute.',
    location: '100ft Road, Near Metro Pillar 118, Indiranagar',
    ward: 'Ward 14 (Indiranagar)',
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
    imageName: 'pothole_100ft_road.jpg',
  },
  {
    label: '🗑️ Garbage Overflow',
    title: 'Overflowing Commercial Dumpster Blocking Footpath',
    category: 'Garbage & Waste',
    urgency: 'Medium',
    description: 'Community bin overflowing for 3 days. Severe odor spreading to nearby residential apartments and school gate.',
    location: '4th Cross, Near BDA Complex, Indiranagar',
    ward: 'Ward 14 (Indiranagar)',
    image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=600&auto=format&fit=crop&q=80',
    imageName: 'overflow_dumpster_4thcross.jpg',
  },
  {
    label: '💡 Dark Streetlight',
    title: 'Broken Streetlight Pole #42 on 12th Main',
    category: 'Electrical & Streetlights',
    urgency: 'Medium',
    description: 'Streetlight completely dark for past 4 nights. Major safety risk for pedestrians and evening walkers.',
    location: '12th Main Road, HAL 2nd Stage, Indiranagar',
    ward: 'Ward 14 (Indiranagar)',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    imageName: 'broken_streetlight_pole42.jpg',
  },
  {
    label: '🚰 Water Pipe Burst',
    title: 'Underground Potable Water Pipe Burst & Street Flooding',
    category: 'Water Supply & Sewage',
    urgency: 'High',
    description: 'Main potable water pipeline fractured. Clean drinking water gushing onto road creating traffic disruption.',
    location: 'CMH Road Junction, Ward 14',
    ward: 'Ward 14 (Indiranagar)',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80',
    imageName: 'pipe_burst_cmh_road.jpg',
  },
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
  const [showGpsModal, setShowGpsModal] = useState(false);
  const [gpsCoords, setGpsCoords] = useState({ lat: 12.9716, lng: 77.5946 });
  const [isGpsPinned, setIsGpsPinned] = useState(false);
  const [pinnedDetails, setPinnedDetails] = useState(null);
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

  const handleApplyPreset = (preset) => {
    setFormData({
      title: preset.title,
      category: preset.category,
      urgency: preset.urgency,
      description: preset.description,
      location: preset.location,
      ward: preset.ward,
    });
    setSelectedImage(preset.image);
    setImageFileName(preset.imageName);
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
        location: '100ft Road, Near KFC Junction, Indiranagar',
        ward: 'Ward 14 (Indiranagar)',
      }));
      setIsLocating(false);
    }, 500);
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
        officer: 'Kalai S. (Zonal Field Officer)',
        department: formData.category.includes('Road') ? 'BBMP Road Infrastructure' : formData.category.includes('Garbage') ? 'Solid Waste Management' : formData.category.includes('Electrical') ? 'BESCOM Electrical Dept' : 'BWSSB Water & Sewage',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      };
      setSubmittedTicket(newTicket);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white pb-12">
      
      {/* HEADER */}
      <PageHeader
        title="Report a Civic Issue"
        description="Fill out the complaint details, attach photo evidence, and pinpoint location. Our AI engine auto-scores urgency and dispatches the task."
        breadcrumbs={[
          { label: 'Citizen Portal', href: '/citizen/dashboard' },
          { label: 'Report Issue' },
        ]}
        badge={<Badge variant="primary" icon={Sparkles}>AI Smart Dispatch</Badge>}
      />

      {/* QUICK PRESETS BANNER */}
      <div className="p-4 bg-rose-50/70 border border-rose-200/90 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-800 shadow-2xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="p-1.5 bg-rose-600 text-white rounded-lg font-bold">
            <Zap className="w-3.5 h-3.5" />
          </span>
          <div>
            <strong className="text-slate-900 font-bold block">1-Click Demo Fill:</strong>
            <span className="text-slate-600 text-[11px]">Click any sample preset below to auto-populate the form:</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {DEMO_PRESETS.map((preset, i) => (
            <button
              type="button"
              key={i}
              onClick={() => handleApplyPreset(preset)}
              className="px-2.5 py-1 bg-white hover:bg-rose-100/70 text-slate-800 hover:text-rose-700 text-xs font-semibold rounded-lg border border-rose-200 shadow-2xs transition-all hover:scale-105 cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* STEP 1: COMPLAINT DETAILS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm border border-rose-100">
                1
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Issue Details & Category</h3>
                <p className="text-xs text-slate-500">Be descriptive for faster officer dispatch</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Required
            </span>
          </div>

          <div className="space-y-4">
            <Input
              label="Complaint Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Dangerous pothole near metro station exit causing bike hazards"
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
                  <div className="mt-2 p-2.5 bg-rose-50/80 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-900 animate-pulse">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>AI Recommends: <strong>{aiSuggestedCategory}</strong></span>
                    </span>
                    <button
                      type="button"
                      onClick={applyAiCategory}
                      className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-[11px] font-bold transition-colors"
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
              placeholder="Describe the issue in detail (nearby landmarks, depth/size, safety hazards, duration)..."
              required
            />

            {/* AI Real-time Priority Preview Card */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300 font-medium">Real-time AI Priority Urgency:</span>
                    <span className="font-mono font-black text-rose-400 text-base">{aiScore}/100</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {aiScore >= 80 ? '⚡ Immediate Rapid Dispatch SLA (Within 2–4 hours)' : aiScore >= 50 ? '⏱️ Standard Zonal Work Queue (Within 24 hours)' : '📅 Scheduled Routine Maintenance'}
                  </p>
                </div>
              </div>

              <div className="self-end sm:self-center">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  aiScore >= 80 ? 'bg-rose-600 text-white shadow-xs' : aiScore >= 50 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-emerald-600 text-white'
                }`}>
                  {aiScore >= 80 ? 'High Priority' : aiScore >= 50 ? 'Medium Priority' : 'Routine Priority'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: LOCATION & GEO-TAGGING */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm border border-rose-100">
                2
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Location & Geo-Tagging</h3>
                <p className="text-xs text-slate-500">Specify street address and zonal ward</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Street Address / Landmark"
                name="location"
                icon={MapPin}
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. 4th Cross Road, Near BDA Complex"
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

            {/* GPS Detect Location Button */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900">GPS Auto-Detect Location</strong>
                  <p className="text-slate-500 text-[11px]">Pinpoint exact coordinates for field inspection teams</p>
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
                  <p className="mt-0.5 text-amber-800">
                    An existing active complaint (<strong>{duplicateWarning.masterTicketId}</strong>: "{duplicateWarning.existingTitle}") is registered within {duplicateWarning.distanceMetres}m. Submitting will link your report to strengthen priority!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STEP 3: PHOTO EVIDENCE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm border border-rose-100">
                3
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Upload Photo Evidence</h3>
                <p className="text-xs text-slate-500">Image uploads speed up field team verification</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {!selectedImage ? (
              <div className="border-2 border-dashed border-slate-300 hover:border-rose-500 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-rose-50/20 transition-all cursor-pointer relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Drag & drop photo here or click to browse</h4>
                  <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP up to 10MB</p>
                </div>
              </div>
            ) : (
              <div className="relative bg-slate-900 text-white rounded-2xl p-4 max-w-md mx-auto text-center space-y-3 shadow-lg border border-slate-800">
                <div className="relative rounded-xl overflow-hidden max-h-52 bg-slate-950">
                  <img src={selectedImage} alt="Uploaded Issue" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded">
                    Geo-Stamped Evidence
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs px-2">
                  <span className="text-slate-300 truncate max-w-[220px] font-medium">{imageFileName || 'evidence_photo.jpg'}</span>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-end gap-3 pt-4">
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
            className="px-8 shadow-md shadow-rose-600/25"
          >
            Submit Complaint
          </Button>
        </div>

      </form>

      {/* ALLOW CURRENT LOCATION PERMISSION POPUP MODAL */}
      {showGpsModal && (
        <Modal
          isOpen={showGpsModal}
          onClose={() => setShowGpsModal(false)}
          title="Location Permission Request"
          subtitle="CivicConnect wants to access your current physical location"
          primaryAction={{
            label: 'Allow Current Location',
            onClick: handleConfirmAllowLocation,
            variant: 'primary',
          }}
          secondaryAction={{
            label: 'Cancel',
            onClick: () => setShowGpsModal(false),
          }}
        >
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-sm">
              <Compass className="w-9 h-9 animate-spin" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900">Allow CivicConnect to access your location?</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                By clicking <strong>"Allow Current Location"</strong>, your browser will capture your exact physical spot address and GPS coordinates through Google Maps reference.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-rose-700 font-bold">
                <Lock className="w-4 h-4" />
                <span>Permanent Spot Address Guarantee</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Once captured, this exact spot address remains permanently saved for your report. Even if you return to your home or travel elsewhere, officers will navigate directly to this spot.
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* SUCCESS CONFIRMATION MODAL */}
      {submittedTicket && (
        <Modal
          isOpen={showSuccessModal}
          onClose={() => {
            setShowSuccessModal(false);
            navigate('/citizen/dashboard');
          }}
          title="Complaint Logged Successfully!"
          subtitle={`Ticket Reference ID: ${submittedTicket.id}`}
          primaryAction={{
            label: 'View My Complaints Queue',
            onClick: () => {
              setShowSuccessModal(false);
              navigate('/citizen/complaints');
            },
            variant: 'primary',
          }}
          secondaryAction={{
            label: 'Back to Overview',
            onClick: () => {
              setShowSuccessModal(false);
              navigate('/citizen/dashboard');
            },
          }}
        >
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Task Dispatched to Zonal Rapid Unit</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Your report has been analyzed by the AI engine and routed to the zonal field inspector.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl text-left text-xs space-y-2.5 border border-slate-200/90">
              <div className="flex justify-between">
                <span className="text-slate-500">Complaint Title:</span>
                <span className="font-bold text-slate-900 text-right max-w-[240px] truncate">{submittedTicket.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-semibold text-slate-800">{submittedTicket.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-semibold text-slate-800">{submittedTicket.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Department:</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">{submittedTicket.department}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-600">AI Priority Score: <strong className="text-rose-600 text-sm font-black">{submittedTicket.priorityScore}/100</strong></span>
                <Badge variant="primary" size="sm">Field Officer: {submittedTicket.officer}</Badge>
              </div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}

