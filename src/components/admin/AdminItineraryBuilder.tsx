import React, { useState } from 'react';
import { useTour } from '../../context/TourContext';
import { 
  ActiveItineraryDay, 
  BookingInquiry 
} from '../../types/tour';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Eye, 
  Building, 
  UserCheck, 
  X
} from 'lucide-react';

export const AdminItineraryBuilder: React.FC<{ initialBookingId?: string }> = ({ initialBookingId }) => {
  const { 
    bookings, 
    packages, 
    partners, 
    updateBookingItinerary, 
    updateItineraryDay, 
    addItineraryActivity, 
    removeItineraryActivity, 
    verifySafetyChecklist,
    setActiveBookingRefForClient,
    setViewMode
  } = useTour();

  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    initialBookingId || (bookings.length > 0 ? bookings[0].id : '')
  );

  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  // New activity modal state
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [actTime, setActTime] = useState('09:00');
  const [actDesc, setActDesc] = useState('');
  const [actLoc, setActLoc] = useState('');
  const [actPartnerId, setActPartnerId] = useState('');

  // Edit Day Header modal state
  const [showEditDayModal, setShowEditDayModal] = useState(false);
  const [dayTitle, setDayTitle] = useState('');
  const [daySubtitle, setDaySubtitle] = useState('');
  const [dayStay, setDayStay] = useState('');
  const [dayDate, setDayDate] = useState('');
  const [dayDriverNotes, setDayDriverNotes] = useState('');
  const [dayEmergency, setDayEmergency] = useState('');

  const currentBooking = bookings.find(b => b.id === selectedBookingId);

  const handleApplyPackageTemplate = (pkgId: string) => {
    if (!currentBooking) return;
    const pkg = packages.find(p => p.id === pkgId);
    if (!pkg) return;

    const baseDate = new Date(currentBooking.tripDetails.startDate || Date.now());

    const generatedDays: ActiveItineraryDay[] = pkg.itineraryDays.map((d, index) => {
      const dayDate = new Date(baseDate);
      dayDate.setDate(baseDate.getDate() + index);
      const dateStr = !isNaN(dayDate.getTime()) ? dayDate.toISOString().split('T')[0] : '';

      return {
        dayNumber: d.dayNumber,
        date: dateStr,
        title: d.title,
        subtitle: d.subtitle,
        stayLocation: d.stayLocation,
        activities: d.schedule.map((sc, scIdx) => {
          const matchingPartner = partners.find(p => p.type === sc.partnerTypeNeeded);
          return {
            id: `act-gen-${Date.now()}-${index}-${scIdx}`,
            time: sc.time,
            activity: sc.activity,
            location: sc.location,
            partnerId: matchingPartner ? matchingPartner.id : undefined,
            partnerName: matchingPartner ? matchingPartner.name : undefined,
            completed: false
          };
        }),
        driverNotes: `Coordinated by ${matchingPartnerName(pkg.destinationId)}`,
        safetyChecklistVerified: false,
        emergencyContact: '+62 812-3456-7890'
      };
    });

    updateBookingItinerary(currentBooking.id, generatedDays);
    setActiveDayIndex(0);
  };

  const matchingPartnerName = (destId: string) => {
    const p = partners.find(part => part.destination.toLowerCase().includes(destId.replace('dest-', '')));
    return p ? p.name : 'Certified Regional Transport Alliance';
  };

  const handleAddNewDay = () => {
    if (!currentBooking) return;
    const nextDayNum = currentBooking.itinerary.length + 1;
    const newDay: ActiveItineraryDay = {
      dayNumber: nextDayNum,
      date: new Date().toISOString().split('T')[0],
      title: `Day ${nextDayNum} Expedition`,
      subtitle: 'Exploration & Transfer',
      stayLocation: 'Boutique Lodge',
      activities: [
        {
          id: `act-${Date.now()}`,
          time: '08:30',
          activity: 'Morning private breakfast and journey briefing with guide',
          location: 'Lodge Terrace',
          completed: false
        }
      ],
      driverNotes: 'Private chauffeur on standby.',
      safetyChecklistVerified: false,
      emergencyContact: '+62 812-3456-7890'
    };

    updateBookingItinerary(currentBooking.id, [...currentBooking.itinerary, newDay]);
    setActiveDayIndex(currentBooking.itinerary.length);
  };

  const handleDeleteDay = (dayNum: number) => {
    if (!currentBooking) return;
    if (confirm(`Remove Day ${dayNum} from this booking itinerary?`)) {
      const filtered = currentBooking.itinerary
        .filter(d => d.dayNumber !== dayNum)
        .map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
      updateBookingItinerary(currentBooking.id, filtered);
      setActiveDayIndex(0);
    }
  };

  const handleOpenAddActivity = () => {
    setActTime('10:00');
    setActDesc('');
    setActLoc('');
    setActPartnerId('');
    setShowAddActivityModal(true);
  };

  const handleSaveActivity = () => {
    if (!currentBooking || !actDesc.trim()) return;
    const selectedDay = currentBooking.itinerary[activeDayIndex];
    if (!selectedDay) return;

    const partner = partners.find(p => p.id === actPartnerId);

    addItineraryActivity(currentBooking.id, selectedDay.dayNumber, {
      time: actTime,
      activity: actDesc.trim(),
      location: actLoc.trim() || 'Regional Site',
      partnerId: partner ? partner.id : undefined,
      partnerName: partner ? partner.name : undefined,
      completed: false
    });

    setShowAddActivityModal(false);
  };

  const handleOpenEditDay = () => {
    if (!currentBooking) return;
    const d = currentBooking.itinerary[activeDayIndex];
    if (!d) return;

    setDayTitle(d.title);
    setDaySubtitle(d.subtitle);
    setDayStay(d.stayLocation);
    setDayDate(d.date);
    setDayDriverNotes(d.driverNotes);
    setDayEmergency(d.emergencyContact || '');
    setShowEditDayModal(true);
  };

  const handleSaveDayHeader = () => {
    if (!currentBooking) return;
    const d = currentBooking.itinerary[activeDayIndex];
    if (!d) return;

    updateItineraryDay(currentBooking.id, d.dayNumber, {
      title: dayTitle,
      subtitle: daySubtitle,
      stayLocation: dayStay,
      date: dayDate,
      driverNotes: dayDriverNotes,
      emergencyContact: dayEmergency
    });

    setShowEditDayModal(false);
  };

  if (!currentBooking) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500">
        No booking selected. Please select a booking in the CRM.
      </div>
    );
  }

  const activeDay = currentBooking.itinerary[activeDayIndex] || currentBooking.itinerary[0];

  return (
    <div className="space-y-6">
      {/* Top Selector & Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-stone-400 block">
              Managing Itinerary For Booking
            </label>
            <select
              value={selectedBookingId}
              onChange={(e) => {
                setSelectedBookingId(e.target.value);
                setActiveDayIndex(0);
              }}
              className="bg-stone-50 border border-stone-200 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-800 cursor-pointer"
            >
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bookingRef} — {b.customer.name} ({b.tripDetails.destinationName})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setActiveBookingRefForClient(currentBooking.bookingRef);
              setViewMode('client');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-800" />
            <span>Preview Client View</span>
          </button>

          <button
            onClick={handleAddNewDay}
            className="px-3.5 py-1.5 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Day</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {currentBooking.itinerary.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white border border-stone-200 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 font-['Playfair_Display']">
              No Itinerary Configured for {currentBooking.bookingRef}
            </h4>
            <p className="text-xs text-stone-500 max-w-md mx-auto mt-1">
              Select a pre-designed master package template from the catalog to populate standard schedules, or build custom days from scratch.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => handleApplyPackageTemplate(pkg.id)}
                className="px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 hover:border-emerald-700 hover:bg-white text-xs text-stone-700 hover:text-emerald-950 flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>Apply "{pkg.title}" ({pkg.itineraryDays.length} Days)</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Day by Day Manager */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Days Tabs (Col 1) */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block px-1">
              Expedition Days ({currentBooking.itinerary.length})
            </span>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {currentBooking.itinerary.map((day, idx) => (
                <div
                  key={day.dayNumber}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                    activeDayIndex === idx
                      ? 'bg-emerald-50/70 border-emerald-800 text-emerald-950 font-medium shadow-xs'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                      activeDayIndex === idx ? 'bg-[#0F2922] text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {day.dayNumber}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-900 truncate max-w-[130px]">
                        {day.title}
                      </div>
                      <div className="text-[10px] text-stone-500 font-mono">
                        {day.date || `Day ${day.dayNumber}`}
                      </div>
                    </div>
                  </div>

                  {day.safetyChecklistVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddNewDay}
              className="w-full py-2.5 rounded-xl border border-dashed border-stone-300 hover:border-emerald-700 text-stone-600 hover:text-emerald-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors bg-white"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Day</span>
            </button>
          </div>

          {/* Active Day Detail Editor (Col 2, 3, 4) */}
          {activeDay && (
            <div className="lg:col-span-3 space-y-6 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-emerald-800 font-bold uppercase">
                      Day {activeDay.dayNumber} of {currentBooking.itinerary.length}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="font-mono text-xs text-stone-500">{activeDay.date}</span>
                  </div>
                  <h3 className="text-xl font-bold font-['Playfair_Display'] text-slate-900 mt-0.5">
                    {activeDay.title}
                  </h3>
                  <p className="text-xs text-stone-500">{activeDay.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenEditDay}
                    className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Header</span>
                  </button>

                  <button
                    onClick={() => handleDeleteDay(activeDay.dayNumber)}
                    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete this day"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Accommodation & Safety Protocol Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center gap-2.5">
                  <Building className="w-4 h-4 text-emerald-800 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Night Lodging Stay</span>
                    <span className="text-stone-900 font-semibold">{activeDay.stayLocation || 'None designated'}</span>
                  </div>
                </div>

                {/* Safety Checklist Toggle */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`w-4 h-4 ${activeDay.safetyChecklistVerified ? 'text-emerald-700' : 'text-stone-400'}`} />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Safety Protocol Audit</span>
                      <span className={`font-semibold ${activeDay.safetyChecklistVerified ? 'text-emerald-800' : 'text-amber-800'}`}>
                        {activeDay.safetyChecklistVerified ? 'Verified & Approved' : 'Audit Pending'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => verifySafetyChecklist(currentBooking.id, activeDay.dayNumber, !activeDay.safetyChecklistVerified)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      activeDay.safetyChecklistVerified
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                    }`}
                  >
                    {activeDay.safetyChecklistVerified ? 'Revoke' : 'Verify'}
                  </button>
                </div>
              </div>

              {/* Schedule Activities List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-stone-700 tracking-wider">
                    Scheduled Activities Timeline ({activeDay.activities.length})
                  </span>

                  <button
                    onClick={handleOpenAddActivity}
                    className="px-3 py-1.5 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Activity Slot</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {activeDay.activities.length === 0 ? (
                    <div className="p-6 text-center text-xs text-stone-400 bg-stone-50 rounded-xl border border-stone-200">
                      No activities added for Day {activeDay.dayNumber} yet. Click "+ Add Activity Slot" above.
                    </div>
                  ) : (
                    activeDay.activities.map((act) => (
                      <div
                        key={act.id}
                        className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-3 group hover:border-emerald-700/50 hover:bg-white transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-xs font-bold text-emerald-800 shrink-0 mt-0.5">
                            {act.time}
                          </span>
                          <div className="space-y-1">
                            <p className="text-stone-900 font-medium text-xs leading-relaxed">
                              {act.activity}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-stone-400" />
                                <span>{act.location}</span>
                              </span>
                              {act.partnerName && (
                                <span className="inline-flex items-center gap-1 text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded text-[10px] font-semibold">
                                  <UserCheck className="w-3 h-3 text-emerald-700" />
                                  <span>Assigned: {act.partnerName}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItineraryActivity(currentBooking.id, activeDay.dayNumber, act.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded text-stone-400 hover:text-rose-600 transition-all shrink-0"
                          title="Remove activity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Driver and Emergency Notes */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">
                  Ground Logistics & Chauffeur Instructions (Section 9)
                </span>
                <p className="text-stone-800 text-xs">
                  {activeDay.driverNotes || 'Standard chauffeur standby.'}
                </p>
                {activeDay.emergencyContact && (
                  <div className="text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                    Emergency Local Contact: <strong className="text-stone-900 font-mono">{activeDay.emergencyContact}</strong>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Activity Modal */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-md p-6 text-stone-800 shadow-2xl relative">
            <button
              onClick={() => setShowAddActivityModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold font-['Playfair_Display'] text-slate-900 mb-4">
              Add Activity to Day {activeDay?.dayNumber}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Time Slot</label>
                <input
                  type="text"
                  value={actTime}
                  onChange={(e) => setActTime(e.target.value)}
                  placeholder="e.g. 03:30 or 14:00"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Activity Description *</label>
                <textarea
                  rows={3}
                  value={actDesc}
                  onChange={(e) => setActDesc(e.target.value)}
                  placeholder="e.g. Private 4x4 sunrise ascent to King Kong Hill with hot tea service..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Location / Landmark</label>
                <input
                  type="text"
                  value={actLoc}
                  onChange={(e) => setActLoc(e.target.value)}
                  placeholder="e.g. Mount Bromo Caldera, East Java"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">
                  Assign Certified Local Partner (Section 9)
                </label>
                <select
                  value={actPartnerId}
                  onChange={(e) => setActPartnerId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800"
                >
                  <option value="">No specific partner assigned</option>
                  {partners.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.destination} • {p.type.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddActivityModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveActivity}
                  className="px-5 py-2 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold"
                >
                  Save Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Day Header Modal */}
      {showEditDayModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-lg p-6 text-stone-800 shadow-2xl relative">
            <button
              onClick={() => setShowEditDayModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold font-['Playfair_Display'] text-slate-900 mb-4">
              Edit Day {activeDay?.dayNumber} Metadata
            </h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Day Title</label>
                  <input
                    type="text"
                    value={dayTitle}
                    onChange={(e) => setDayTitle(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Calendar Date</label>
                  <input
                    type="date"
                    value={dayDate}
                    onChange={(e) => setDayDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Route Subtitle</label>
                <input
                  type="text"
                  value={daySubtitle}
                  onChange={(e) => setDaySubtitle(e.target.value)}
                  placeholder="e.g. Surabaya Pickup → Tengger Mountain Lodge"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Overnight Lodging Stay</label>
                <input
                  type="text"
                  value={dayStay}
                  onChange={(e) => setDayStay(e.target.value)}
                  placeholder="e.g. Jiwa Jawa Resort Bromo"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Driver & Dispatch Notes</label>
                <textarea
                  rows={2}
                  value={dayDriverNotes}
                  onChange={(e) => setDayDriverNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-600 uppercase text-[10px] font-bold mb-1">Emergency Dispatch Contact</label>
                <input
                  type="text"
                  value={dayEmergency}
                  onChange={(e) => setDayEmergency(e.target.value)}
                  placeholder="+62 812-xxxx-xxxx"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowEditDayModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDayHeader}
                  className="px-5 py-2 rounded-xl bg-[#0F2922] hover:bg-[#153A30] text-white font-bold"
                >
                  Save Day Metadata
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
