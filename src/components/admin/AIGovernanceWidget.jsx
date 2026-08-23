import React, { useState } from 'react';
import {
  Cpu,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  PieChart,
  Lightbulb,
  ShieldCheck,
  Zap,
  BarChart2,
  Sliders,
  Send
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function AIGovernanceWidget({ onTriggerAction }) {
  const [activeTab, setActiveTab] = useState('insights'); // 'insights' or 'budget'
  const [executedActions, setExecutedActions] = useState({});
  const [budgetApplied, setBudgetApplied] = useState(false);

  const aiInsights = [
    {
      id: 'ai-1',
      type: 'Pattern Alert',
      urgency: 'Critical',
      title: 'Water pipe leaks increased by +35% in Ward 8 over 48h',
      description: 'Anomaly detection model flagged pressure drops in underground mains along Lakeview Corridor. Immediate inspection recommended to prevent rupture.',
      impact: 'Prevents estimated 450kL potable water loss',
      actionLabel: 'Trigger Ward 8 Audit',
      badgeVariant: 'danger',
      bgColor: 'bg-rose-50/80',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-900',
    },
    {
      id: 'ai-2',
      type: 'Predictive Maintenance',
      urgency: 'High',
      title: 'Monsoon silt accumulation index: 8.7/10 in Sector 4',
      description: 'AI hydrological forecast predicts severe waterlogging during next precipitation. Recommend pre-emptive de-silting crew deployment.',
      impact: 'Mitigates flood risk for ~12,000 residents',
      actionLabel: 'Auto-Dispatch De-silting Crew',
      badgeVariant: 'warning',
      bgColor: 'bg-amber-50/80',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-900',
    },
    {
      id: 'ai-3',
      type: 'SLA Optimization',
      urgency: 'Positive',
      title: 'Sanitation auto-dispatch reduced response time from 12h to 3.2h',
      description: 'Algorithmically routed garbage compactors in Ward 14 achieved 96% same-day clearance. Ready for rollout to Ward 22 and Ward 31.',
      impact: '+73% faster turnaround across 480 tickets',
      actionLabel: 'Rollout to Ward 22 & 31',
      badgeVariant: 'success',
      bgColor: 'bg-emerald-50/80',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-900',
    },
    {
      id: 'ai-4',
      type: 'Citizen Sentiment Anomaly',
      urgency: 'Moderate',
      title: 'Dark spot dissatisfaction clustering in East Zone',
      description: 'Natural language processing on citizen feedback identified 38 street lighting outages concentrated along 3 school transit routes.',
      impact: 'Restores public safety across 4.2 km corridor',
      actionLabel: 'Schedule Nighttime Repair Sweep',
      badgeVariant: 'purple',
      bgColor: 'bg-purple-50/80',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-900',
    },
  ];

  const budgetProposals = [
    {
      id: 'b-1',
      dept: 'PWD Road Infrastructure',
      currentAllocation: '₹84.0 Lakhs',
      suggestedChange: '+₹18.5 Lakhs (+22.0%)',
      densityRationale: 'Driven by 420 reported potholes post-monsoon concentrated in East Zone corridors.',
      projectedSlaImprovement: '+14% SLA Gain',
      positive: true,
      color: 'border-amber-200 bg-amber-50/50',
    },
    {
      id: 'b-2',
      dept: 'Water Supply & Sewage Board',
      currentAllocation: '₹55.0 Lakhs',
      suggestedChange: '+₹12.0 Lakhs (+21.8%)',
      densityRationale: 'Allocated for ultrasonic acoustic leak detection sensors in Ward 8 aging pipeline corridor.',
      projectedSlaImprovement: '+18% SLA Gain',
      positive: true,
      color: 'border-sky-200 bg-sky-50/50',
    },
    {
      id: 'b-3',
      dept: 'Sanitation & Solid Waste',
      currentAllocation: '₹92.0 Lakhs',
      suggestedChange: '+₹8.2 Lakhs (+8.9%)',
      densityRationale: 'Smart bin IoT fill-level telemetry deployment across 120 high-density commercial points.',
      projectedSlaImprovement: '+6% SLA Gain',
      positive: true,
      color: 'border-emerald-200 bg-emerald-50/50',
    },
  ];

  const handleActionClick = (insight) => {
    setExecutedActions((prev) => ({ ...prev, [insight.id]: true }));
    onTriggerAction?.(insight.actionLabel, insight.title);
  };

  const handleApplyBudget = () => {
    setBudgetApplied(true);
    onTriggerAction?.('AI Municipal Budget Re-allocation', 'Optimized ₹38.7 Lakhs civic fund redistribution applied successfully.');
  };

  return (
    <Card
      title="AI Governance Intelligence & Predictive Engine"
      subtitle="Autonomous pattern detection, anomaly triage, and density-driven municipal budget optimization"
      headerIcon={Cpu}
      action={
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'insights'
                ? 'bg-white shadow-xs text-purple-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pattern Alerts ({aiInsights.length})
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
              activeTab === 'budget'
                ? 'bg-white shadow-xs text-purple-900 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Budget Allocation AI
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        
        {/* TAB 1: AI PATTERN ALERTS & INSIGHT CARDS */}
        {activeTab === 'insights' ? (
          <div className="space-y-3">
            {aiInsights.map((insight) => {
              const isExecuted = executedActions[insight.id];
              return (
                <div
                  key={insight.id}
                  className={`p-4 rounded-xl border ${insight.borderColor} ${insight.bgColor} transition-all duration-200 space-y-2.5`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
                        {insight.type}
                      </span>
                    </div>
                    <Badge variant={insight.badgeVariant} size="sm">
                      {insight.urgency}
                    </Badge>
                  </div>

                  <div>
                    <h4 className={`text-sm font-bold ${insight.textColor}`}>
                      {insight.title}
                    </h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      Impact: {insight.impact}
                    </span>

                    <button
                      onClick={() => handleActionClick(insight)}
                      disabled={isExecuted}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isExecuted
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                      }`}
                    >
                      {isExecuted ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Action Authorized</span>
                        </>
                      ) : (
                        <>
                          <span>{insight.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TAB 2: AI BUDGET ALLOCATION SUGGESTIONS */
          <div className="space-y-4">
            
            {/* Header Banner */}
            <div className="p-4 bg-purple-950 text-white rounded-xl border border-purple-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-purple-300" />
                  <span className="font-bold text-sm">Complaint-Density Budget Optimization</span>
                </div>
                <Badge variant="purple" size="sm">
                  Autonomous Fiscal Model
                </Badge>
              </div>
              <p className="text-xs text-purple-200 leading-relaxed">
                Our machine learning governance model recommends dynamic fund reallocation from low-incident wards to critical infrastructure corridors to maximize SLA turnaround.
              </p>
            </div>

            {/* Budget Proposals Cards */}
            <div className="space-y-3">
              {budgetProposals.map((prop) => (
                <div
                  key={prop.id}
                  className={`p-4 rounded-xl border ${prop.color} transition-all space-y-2`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-bold text-xs text-slate-900">
                      {prop.dept}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-mono">Base: {prop.currentAllocation}</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold font-mono text-xs border border-emerald-300">
                        {prop.suggestedChange}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600">
                    <strong>Density Rationale:</strong> {prop.densityRationale}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-purple-700 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Projected Outcome: {prop.projectedSlaImprovement}
                    </span>
                    <span className="text-slate-400 font-mono">Source: Ward Telemetry Data</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Apply Action Button */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Total Recommended Dynamic Reallocation: <span className="text-purple-700 font-mono font-extrabold text-sm">₹38.7 Lakhs</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Pre-authorized under Municipal Smart City Disaster & Emergency Resilience Protocol 2026.
                </p>
              </div>

              <Button
                variant={budgetApplied ? 'success' : 'primary'}
                size="sm"
                icon={budgetApplied ? CheckCircle2 : Sparkles}
                onClick={handleApplyBudget}
                disabled={budgetApplied}
                className="bg-purple-700 hover:bg-purple-800 text-white font-bold shrink-0"
              >
                {budgetApplied ? 'Optimization Applied' : 'Execute Budget Reallocation'}
              </Button>
            </div>

          </div>
        )}

      </div>
    </Card>
  );
}
