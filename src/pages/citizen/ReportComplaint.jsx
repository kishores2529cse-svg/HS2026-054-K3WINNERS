import React, { useState } from 'react';
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
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import PageHeader from '../../components/common/PageHeader';

const CATEGORIES = [
  'Garbage & Waste',
  'Road Infrastructure & Potholes',
  'Electrical & Streetlights',
  'Water Supply & Leakage',
  'Drainage & Sewage',
  'Public Transport & Stop Hazard',
  'Other Civic Concern',
];

export default function ReportComplaint() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: CATEGORIES[0],
    description: '',
    location: '',
    ward: 'Ward 14 (Indiranagar)',
    urgency: 'Medium',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFakeImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call + AI categorization processing
    setTimeout(() => {
      const generatedId = `CC-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicketId(generatedId);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* HEADER */}
      <PageHeader
        title="Report a Civic Issue"
        description="Provide details, upload photo evidence, and pinpoint location. AI will categorize and route your complaint to the correct municipal team."
        breadcrumbs={[
          { label: 'Citizen Portal', href: '/citizen/dashboard' },
          { label: 'Report Issue' },
        ]}
        badge={<Badge variant="primary">AI Smart Dispatch</Badge>}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* STEP 1: COMPLAINT DETAILS */}
        <Card
          title="1. Issue Details & Category"
          subtitle="Be descriptive so officials understand the urgency"
        >
          <div className="space-y-4">
            <Input
              label="Complaint Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Deep pothole on 4th Cross Road causing traffic congestion"
              required
              helperText="Short summary of the civic problem"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Issue Category"
                type="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={CATEGORIES}
                required
              />

              <Input
                label="Urgency Level"
                type="select"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                options={[
                  { label: 'Low - Routine Maintenance', value: 'Low' },
                  { label: 'Medium - Needs Attention Soon', value: 'Medium' },
                  { label: 'High - Immediate Hazard / Danger', value: 'High' },
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
              placeholder="Provide additional context (e.g. dimensions, landmarks, safety risks, duration)..."
              required
            />
          </div>
        </Card>

        {/* STEP 2: LOCATION */}
        <Card
          title="2. Location & Geo-Tagging"
          subtitle="Pinpoint exact coordinates or specify ward"
          headerIcon={MapPin}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Street Address / Landmark"
                name="location"
                icon={MapPin}
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Opposite City Supermarket, MG Road"
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

            {/* Map pin visual placeholder */}
            <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-600 rounded-lg text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">GPS Auto-Location Target</div>
                  <div className="text-slate-400">Lat: 12.9716° N, Long: 77.5946° E (Precision: ± 3m)</div>
                </div>
              </div>
              <Badge variant="success" size="sm">GPS Verified</Badge>
            </div>
          </div>
        </Card>

        {/* STEP 3: PHOTO UPLOAD */}
        <Card
          title="3. Upload Photo Evidence"
          subtitle="Photos help AI categorize and verify physical civic damage"
          headerIcon={ImageIcon}
        >
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-8 text-center bg-slate-50/50 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFakeImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">
                  {selectedImage ? 'Photo selected! Click to replace' : 'Drag & drop image here or click to browse'}
                </h4>
                <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP up to 10MB</p>
              </div>
            </div>

            {selectedImage && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 p-2 max-w-xs mx-auto text-center">
                <img src={selectedImage} alt="Selected Preview" className="max-h-48 rounded-lg mx-auto object-cover" />
                <p className="text-[11px] text-emerald-400 mt-2 font-medium">✓ Image Attached for AI Visual Audit</p>
              </div>
            )}

            {/* AI Classification Simulation Note */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-950">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">AI Duplicate Protection:</strong>
                <p className="text-emerald-800 mt-0.5">
                  Upon submission, AI checks for existing reports within 50 meters to prevent duplicate work tickets and fast-track resolution.
                </p>
              </div>
            </div>
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
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/citizen/dashboard');
        }}
        title="Complaint Submitted Successfully!"
        subtitle={`Ticket ID: ${submittedTicketId}`}
        primaryAction={{
          label: 'Go to Dashboard',
          onClick: () => {
            setShowSuccessModal(false);
            navigate('/citizen/dashboard');
          },
        }}
      >
        <div className="space-y-4 text-center py-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your complaint has been logged and auto-routed by AI to the designated Zonal Field Inspector. You will receive real-time notifications on progress.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl text-left text-xs space-y-1.5 border border-slate-200">
            <div><strong>Title:</strong> {formData.title || 'Civic Issue'}</div>
            <div><strong>Category:</strong> {formData.category}</div>
            <div><strong>Ward:</strong> {formData.ward}</div>
            <div><strong>Assigned Department:</strong> Municipal Works Dept</div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
