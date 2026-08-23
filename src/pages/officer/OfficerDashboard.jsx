import { useState, useMemo } from 'react';
import {
  RefreshCw,
  MapPin,
  Filter,
  Check,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import PageHeader from '../../components/common/PageHeader';

// Subcomponents
import { INITIAL_OFFICER_COMPLAINTS, OFFICER_PROFILE } from '../../components/officer/officerData';
import OfficerStats from '../../components/officer/OfficerStats';
import OfficerFilterBar from '../../components/officer/OfficerFilterBar';
import ComplaintCard from '../../components/officer/ComplaintCard';
import OfficerWardMap from '../../components/officer/OfficerWardMap';
import StatusUpdateModal from '../../components/officer/StatusUpdateModal';
import ComplaintDetailModal from '../../components/officer/ComplaintDetailModal';
import OfficerAnalytics from '../../components/officer/OfficerAnalytics';

export default function OfficerDashboard() {
  // Main State
  const [complaints, setComplaints] = useState(INITIAL_OFFICER_COMPLAINTS);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statsCardFilter, setStatsCardFilter] = useState(null);

  // Modal States
  const [updatingComplaint, setUpdatingComplaint] = useState(null);
  const [detailComplaint, setDetailComplaint] = useState(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Derive unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(INITIAL_OFFICER_COMPLAINTS.map((c) => c.category)));
  }, []);

  // Filter complaints based on Search, Status, Priority, and Category
  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      // Status filter
      const matchesStatus =
        statusFilter === 'All' || item.status === statusFilter;

      // Priority filter
      const matchesPriority =
        priorityFilter === 'All' || item.priority === priorityFilter;

      // Category filter
      const matchesCategory =
        categoryFilter === 'All' || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  }, [complaints, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  // Handle Stat Card Clicks to Quick-Filter
  const handleStatCardClick = (filterId) => {
    if (filterId === 'all') {
      setStatusFilter('All');
      setPriorityFilter('All');
      setStatsCardFilter(null);
    } else if (filterId === 'High Priority') {
      setPriorityFilter('High');
      setStatusFilter('All');
      setStatsCardFilter('High Priority');
    } else {
      setStatusFilter(filterId);
      setPriorityFilter('All');
      setStatsCardFilter(filterId);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setCategoryFilter('All');
    setStatsCardFilter(null);
  };

  // Save updated status from modal
  const handleSaveStatus = (updatedComplaint) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === updatedComplaint.id ? updatedComplaint : c))
    );
    showToast(`Complaint ${updatedComplaint.id} status updated to "${updatedComplaint.status}" with resolution proof!`);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. HEADER */}
      <PageHeader
        title="Officer Command Dashboard"
        description="Zonal field officer task queue, priority inspection dispatch, and resolution verification."
        badge={<Badge variant="info">Officer Portal ({OFFICER_PROFILE.name})</Badge>}
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={RefreshCw}
              onClick={() => {
                setComplaints(INITIAL_OFFICER_COMPLAINTS);
                handleResetFilters();
                showToast('Refreshed officer complaint queue with latest field telemetry.');
              }}
            >
              Sync Field Queue
            </Button>
          </div>
        }
      />

      {/* 2. OFFICER JURISDICTION BANNER */}
      <div className="p-4 bg-gradient-to-r from-sky-50 via-sky-50/80 to-indigo-50 border border-sky-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sky-950">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-sky-600 text-white rounded-xl shadow-xs mt-0.5">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <strong className="font-bold text-sm text-slate-900">
                {OFFICER_PROFILE.ward} &bull; {OFFICER_PROFILE.zone}
              </strong>
              <span className="text-[10px] bg-sky-200/70 text-sky-900 font-bold px-2 py-0.5 rounded-md">
                Field Officer Active
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Officer: <strong>{OFFICER_PROFILE.name}</strong> ({OFFICER_PROFILE.badgeNumber}) &bull; Active Field SLA Compliance: <strong className="text-emerald-700">{OFFICER_PROFILE.slaCompliance}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Queue Health</span>
            <span className="text-xs font-bold text-slate-800">
              {complaints.filter((c) => c.status === 'Resolved').length} of {complaints.length} Resolved
            </span>
          </div>
        </div>
      </div>

      {/* 3. METRIC CARDS HEADER */}
      <OfficerStats
        complaints={complaints}
        activeFilter={statsCardFilter}
        onSelectFilter={handleStatCardClick}
      />

      {/* 4. MAIN INTERACTIVE WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT / MAIN COLUMN: FILTER BAR + LIST OR MAP VIEW */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Search & Filter Controller */}
          <OfficerFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={(st) => {
              setStatusFilter(st);
              setStatsCardFilter(st === 'All' ? null : st);
            }}
            priorityFilter={priorityFilter}
            onPriorityChange={(pr) => {
              setPriorityFilter(pr);
              setStatsCardFilter(pr === 'High' ? 'High Priority' : null);
            }}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            viewMode={activeTab}
            onViewModeChange={setActiveTab}
            categories={categories}
            totalResults={filteredComplaints.length}
            onResetFilters={handleResetFilters}
          />

          {/* VIEW SWITCHER CONTENT */}
          {activeTab === 'list' ? (
            /* LIST VIEW */
            <div className="space-y-3.5">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((item) => (
                  <ComplaintCard
                    key={item.id}
                    complaint={item}
                    onUpdateStatus={(c) => setUpdatingComplaint(c)}
                    onViewDetails={(c) => setDetailComplaint(c)}
                  />
                ))
              ) : (
                /* Empty state when filters return 0 */
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <Filter className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">No matching complaints found</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your search query, status, or priority filters to inspect other field tasks.
                  </p>
                  <Button variant="outline" size="sm" onClick={handleResetFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          ) : (
            /* MAP VIEW (Interactive Leaflet Map) */
            <OfficerWardMap
              complaints={filteredComplaints}
              onUpdateStatus={(c) => setUpdatingComplaint(c)}
              onViewDetails={(c) => setDetailComplaint(c)}
            />
          )}

        </div>

        {/* RIGHT COLUMN: OFFICER PROFILE & PERFORMANCE ANALYTICS */}
        <div className="lg:col-span-4 space-y-6">
          <OfficerAnalytics complaints={complaints} />
        </div>

      </div>

      {/* 5. STATUS UPDATE & PROOF UPLOAD MODAL */}
      <StatusUpdateModal
        isOpen={Boolean(updatingComplaint)}
        onClose={() => setUpdatingComplaint(null)}
        complaint={updatingComplaint}
        onSave={handleSaveStatus}
      />

      {/* 6. COMPLAINT INSPECTION DOSSIER MODAL */}
      <ComplaintDetailModal
        isOpen={Boolean(detailComplaint)}
        onClose={() => setDetailComplaint(null)}
        complaint={detailComplaint}
        onOpenUpdateModal={(c) => setUpdatingComplaint(c)}
      />

    </div>
  );
}
