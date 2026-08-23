import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  User,
  CheckCircle2,
  MessageSquare,
  Send,
  Cpu,
  ArrowLeft,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import PageHeader from '../../components/common/PageHeader';
import { MOCK_CITIZEN_COMPLAINTS } from './CitizenDashboard';

export default function ComplaintDetails() {
  const { id } = useParams();
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([
    { sender: 'Citizen (You)', text: 'Thank you for looking into this issue quickly!', time: '1 day ago' },
    { sender: 'S. Ramesh (Officer)', text: 'Inspection team dispatched. Repair crew scheduled for morning shift.', time: '18 hours ago' },
  ]);

  const complaint = MOCK_CITIZEN_COMPLAINTS.find((c) => c.id === id) || MOCK_CITIZEN_COMPLAINTS[0];

  const timelineSteps = [
    {
      title: 'Complaint Submitted',
      date: complaint.date,
      desc: 'Citizen uploaded report with auto geo-tagging.',
      status: 'completed',
    },
    {
      title: 'AI Classification & Priority',
      date: complaint.date,
      desc: `Categorized into ${complaint.category}. Priority score: ${complaint.priorityScore}/100.`,
      status: 'completed',
    },
    {
      title: 'Officer Assigned',
      date: '2026-08-23',
      desc: `Assigned to ${complaint.officer}.`,
      status: complaint.status !== 'Pending' ? 'completed' : 'current',
    },
    {
      title: 'Work In Progress',
      date: complaint.status === 'In Progress' || complaint.status === 'Resolved' ? '2026-08-23' : 'Pending',
      desc: 'Field team dispatched to site with equipment.',
      status: complaint.status === 'Resolved' ? 'completed' : complaint.status === 'In Progress' ? 'current' : 'upcoming',
    },
    {
      title: 'Final Verification & Resolution',
      date: complaint.status === 'Resolved' ? '2026-08-23' : 'Pending',
      desc: 'Resolution photo verified by AI and ticket closed.',
      status: complaint.status === 'Resolved' ? 'completed' : 'upcoming',
    },
  ];

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentsList([...commentsList, { sender: 'Citizen (You)', text: commentText, time: 'Just now' }]);
    setCommentText('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto bg-white">
      
      {/* HEADER */}
      <PageHeader
        title={`Complaint Ticket #${complaint.id}`}
        description="Detailed progress lifecycle and official response feed."
        breadcrumbs={[
          { label: 'Citizen Portal', href: '/citizen/dashboard' },
          { label: 'My Complaints', href: '/citizen/complaints' },
          { label: complaint.id },
        ]}
        badge={<StatusBadge status={complaint.status} size="lg" />}
        action={
          <Link to="/citizen/complaints">
            <Button variant="outline" size="sm" icon={ArrowLeft}>
              Back to List
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN DETAILS & TIMELINE */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Issue Card */}
          <Card title={complaint.title} subtitle={`Category: ${complaint.category}`}>
            <div className="space-y-4">
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {complaint.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="text-slate-400 font-medium">Location</div>
                  <div className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="truncate">{complaint.location}</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="text-slate-400 font-medium">Reported Date</div>
                  <div className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{complaint.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Resolution Lifecycle Timeline */}
          <Card title="Resolution Timeline & Milestones">
            <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 my-2">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                      step.status === 'completed'
                        ? 'border-rose-600 bg-rose-600 text-white'
                        : step.status === 'current'
                        ? 'border-rose-500 bg-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {step.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                      <span className="text-[10px] text-slate-400">{step.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comments Feed */}
          <Card title="Officer & Citizen Activity Feed" headerIcon={MessageSquare}>
            <div className="space-y-4">
              <div className="space-y-3">
                {commentsList.map((c, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{c.sender}</span>
                      <span className="text-[10px] font-normal text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-slate-600">{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message or response..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
                <Button type="submit" variant="primary" size="sm" icon={Send}>
                  Send
                </Button>
              </form>
            </div>
          </Card>

        </div>

        {/* RIGHT COLUMN OFFICER & AI METRICS */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Assigned Officer Card */}
          <Card title="Assigned Field Officer" headerIcon={User}>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 font-bold flex items-center justify-center border border-rose-200">
                  SO
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{complaint.officer}</h4>
                  <p className="text-slate-500">Public Works Department</p>
                </div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg text-slate-600 font-mono text-[11px] border border-slate-200">
                Zonal Ward: Indiranagar 14
              </div>
            </div>
          </Card>

          {/* AI Insights Card */}
          <Card title="AI Intelligence Summary" headerIcon={Cpu}>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Urgency Priority Score</span>
                <span className="font-bold text-rose-600 font-mono text-sm">{complaint.priorityScore}/100</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${complaint.priorityScore}%` }} />
              </div>
              <div className="p-3 bg-rose-50 text-rose-900 rounded-xl text-[11px] space-y-1 border border-rose-200">
                <strong className="font-bold">Duplicate Scan Passed:</strong>
                <p>No identical reports registered within 100 meters.</p>
              </div>
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
