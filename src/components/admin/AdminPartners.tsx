import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { PartnerType } from '../../types/tour';
import { ShieldCheck, Plus, Star, Phone, Mail, Trash2, X } from 'lucide-react';

export const AdminPartners: React.FC = () => {
  const { partners, addPartner, deletePartner } = useTour();
  const [showAddModal, setShowAddModal] = useState(false);

  // New partner state
  const [name, setName] = useState('');
  const [type, setType] = useState<PartnerType>('driver_transport');
  const [destination, setDestination] = useState('Mount Bromo');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [safetyRating, setSafetyRating] = useState(5.0);
  const [rateCardSummary, setRateCardSummary] = useState('');
  const [vehicleFleetOrEquipment, setVehicleFleetOrEquipment] = useState('');
  const [notes, setNotes] = useState('');

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactPerson.trim()) return;

    addPartner({
      name: name.trim(),
      type,
      destination,
      verified: true,
      licenseNumber: licenseNumber.trim() || `DISPAR-ID-${Math.floor(1000 + Math.random() * 9000)}`,
      contactPerson: contactPerson.trim(),
      phone: phone.trim() || '+62 812-0000-0000',
      email: email.trim() || `${name.toLowerCase().replace(/[^a-z]/g, '')}@thirteen-partner.id`,
      safetyRating: Number(safetyRating),
      lastAuditDate: new Date().toISOString().split('T')[0],
      rateCardSummary: rateCardSummary.trim() || 'Custom contractual SLA rate',
      vehicleFleetOrEquipment: vehicleFleetOrEquipment.trim(),
      notes: notes.trim() || 'Verified under Phase 1 Decision Record safety standards.'
    });

    setShowAddModal(false);
    setName('');
    setContactPerson('');
    setPhone('');
    setRateCardSummary('');
    setVehicleFleetOrEquipment('');
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Certified Partner Network (Section 9)</span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Asset-light ecosystem: Audited transport alliances, miner guilds, and archaeological historians.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Register New Partner</span>
        </button>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="p-5 rounded-2xl bg-white border border-stone-200 flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold uppercase">
                  {partner.destination}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-700 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{partner.safetyRating.toFixed(1)}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 font-['Playfair_Display']">
                  {partner.name}
                </h4>
                <div className="text-[11px] text-stone-500 capitalize mt-0.5">
                  Type: {partner.type.replace('_', ' ')}
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 text-[11px]">Contact:</span>
                  <span className="font-medium text-slate-900">{partner.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-emerald-700" />
                  <span className="font-mono text-stone-700 text-[11px]">{partner.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-stone-400" />
                  <span className="text-stone-600 text-[11px] truncate">{partner.email}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] space-y-1">
                <span className="text-stone-400 uppercase text-[9px] font-bold block">Rate Card Agreement</span>
                <p className="text-stone-800 font-medium">{partner.rateCardSummary}</p>
                {partner.vehicleFleetOrEquipment && (
                  <p className="text-stone-600 text-[10px] mt-1 pt-1 border-t border-stone-200">
                    Fleet/Gear: {partner.vehicleFleetOrEquipment}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
              <span className="font-mono">License: {partner.licenseNumber}</span>
              <button
                onClick={() => {
                  if (confirm(`Remove partner ${partner.name}?`)) {
                    deletePartner(partner.id);
                  }
                }}
                className="text-stone-400 hover:text-rose-600 p-1"
                title="Remove partner"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Partner Modal */}
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
              Register Certified Partner (Section 9 Standards)
            </h3>

            <form onSubmit={handleCreatePartner} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Partner / Org Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bromo Caldera 4x4 Guild"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Service Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as PartnerType)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  >
                    <option value="driver_transport">Chauffeur & Luxury Transport</option>
                    <option value="mountain_guide">Mountain / Cultural Guide</option>
                    <option value="jeep_operator">4x4 Jeep Operator</option>
                    <option value="boutique_stay">Boutique Mountain Stay</option>
                    <option value="equipment_rental">Safety & Gear Rental</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Destination Region</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                  >
                    <option value="Mount Bromo">Mount Bromo</option>
                    <option value="Mount Ijen">Mount Ijen</option>
                    <option value="Bali">Bali</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                    <option value="Lombok">Lombok</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Audit Safety Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={safetyRating}
                    onChange={(e) => setSafetyRating(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Contact Person Lead *</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Pak Joko / Dr. Retno"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 8xx-xxxx-xxxx"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Rate Card Summary (Cost Basis)</label>
                <input
                  type="text"
                  value={rateCardSummary}
                  onChange={(e) => setRateCardSummary(e.target.value)}
                  placeholder="e.g. IDR 850,000 / private sunrise tour / 4x4"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Fleet or Safety Equipment Description</label>
                <input
                  type="text"
                  value={vehicleFleetOrEquipment}
                  onChange={(e) => setVehicleFleetOrEquipment(e.target.value)}
                  placeholder="e.g. Toyota FJ40 with winch, 3M gas respirators with 6003 acid cartridges"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900"
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
                  Register Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
