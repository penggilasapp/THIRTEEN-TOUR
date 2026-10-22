import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { TourType, ServiceTier } from '../../types/tour';
import { Compass, Plus, Eye, EyeOff, Trash2, X } from 'lucide-react';

export const AdminPackages: React.FC = () => {
  const { packages, updatePackage, addPackage, deletePackage, destinations } = useTour();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [destinationId, setDestinationId] = useState('dest-bromo');
  const [tourType, setTourType] = useState<TourType>('custom_private');
  const [serviceTier, setServiceTier] = useState<ServiceTier>('private');
  const [durationDays, setDurationDays] = useState(3);
  const [durationNights, setDurationNights] = useState(2);
  const [shortDescription, setShortDescription] = useState('');
  const [experienceNarrative, setExperienceNarrative] = useState('');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80');

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dest = destinations.find(d => d.id === destinationId);

    addPackage({
      title: title.trim(),
      destinationId,
      destinationName: dest ? dest.name : 'Java Overland',
      tourType,
      serviceTier,
      durationDays: Number(durationDays),
      durationNights: Number(durationNights),
      indicativeDuration: `${durationDays} Days / ${durationNights} Nights`,
      shortDescription: shortDescription.trim() || 'Curated private expedition crafted for international travelers.',
      experienceNarrative: experienceNarrative.trim() || shortDescription.trim(),
      highlights: [
        'Private chauffeured executive transport',
        'Certified mountain guides and VIP national park permits',
        'Hand-picked boutique mountain lodging suites'
      ],
      inclusions: [
        'All private transfers in air-conditioned luxury vehicle',
        'Daily breakfasts and refreshments',
        'Safety respirators and emergency kit'
      ],
      exclusions: [
        'International flights',
        'Travel insurance and personal concierge expenses'
      ],
      safetyMandates: [
        'Pre-trip medical declaration and fitness clearance'
      ],
      itineraryDays: [
        {
          dayNumber: 1,
          title: 'Arrival & Scenic Ascent',
          subtitle: 'Airport Greeting → Highland Lodge',
          stayLocation: 'Boutique Lodge',
          meals: ['Dinner'],
          schedule: [
            { time: '10:00', activity: 'Private airport meet & greeting', location: 'Arrival Airport' },
            { time: '15:00', activity: 'Scenic transfer to mountain retreat', location: 'Highland Pass' }
          ]
        }
      ],
      targetAudience: 'Discerning couples, photographers, private circles',
      active: true,
      coverImage
    });

    setShowAddModal(false);
    setTitle('');
    setShortDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Master Package Catalog (Decisions #004, #007, #009)</span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Public pricing is hidden per Decision 007. Edit duration, narrative, and service tiers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create New Package</span>
        </button>
      </div>

      {/* Package List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-5 rounded-2xl bg-white border transition-all space-y-4 shadow-xs ${
              pkg.active ? 'border-stone-200' : 'border-stone-200 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-800">{pkg.code}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-mono">
                    {pkg.indicativeDuration}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 capitalize font-medium">
                    {pkg.serviceTier.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 font-['Playfair_Display'] mt-1">
                  {pkg.title}
                </h4>
                <div className="text-xs text-stone-500 mt-0.5">
                  Region: {pkg.destinationName} • Type: {pkg.tourType.replace('_', ' ')}
                </div>
              </div>

              <button
                onClick={() => updatePackage(pkg.id, { active: !pkg.active })}
                title={pkg.active ? 'Hide from public site' : 'Show on public site'}
                className={`p-2 rounded-xl transition-colors ${
                  pkg.active ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-400'
                }`}
              >
                {pkg.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs text-stone-600 line-clamp-2">
              {pkg.shortDescription}
            </p>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
              <span className="text-stone-500">Master Template Days:</span>
              <span className="font-bold text-slate-900">{pkg.itineraryDays.length} Days Mapped</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
              <span className="text-emerald-800 font-semibold text-[11px]">
                Public Status: {pkg.active ? 'Published (No Public Price)' : 'Draft / Inactive'}
              </span>

              <button
                onClick={() => {
                  if (confirm(`Delete package "${pkg.title}"?`)) {
                    deletePackage(pkg.id);
                  }
                }}
                className="text-stone-400 hover:text-rose-600 p-1"
                title="Delete package"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Package Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg p-6 text-stone-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold font-['Playfair_Display'] text-slate-900 mb-4">
              Create New Tour Package Template
            </h3>

            <form onSubmit={handleCreatePackage} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Banyuwangi Secret Rainforest & Ijen Sunrise"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">Destination</label>
                  <select
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  >
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">Service Tier (Decision #020)</label>
                  <select
                    value={serviceTier}
                    onChange={(e) => setServiceTier(e.target.value as ServiceTier)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  >
                    <option value="essential">Essential Tier</option>
                    <option value="private">Private Tier (Core)</option>
                    <option value="premium_concierge">Premium Concierge</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">Tour Type</label>
                  <select
                    value={tourType}
                    onChange={(e) => setTourType(e.target.value as TourType)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  >
                    <option value="custom_private">Custom Private</option>
                    <option value="fixed_package">Fixed Package</option>
                    <option value="modular_tour">Modular Tour</option>
                    <option value="multiday_expedition">Multi-Day Expedition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">Days</label>
                  <input
                    type="number"
                    min="1"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">Nights</label>
                  <input
                    type="number"
                    min="0"
                    value={durationNights}
                    onChange={(e) => setDurationNights(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Summary of experience for client catalog..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-700 uppercase text-[10px] font-bold mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold"
                >
                  Create Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
