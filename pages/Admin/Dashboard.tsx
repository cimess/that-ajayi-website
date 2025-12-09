import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { LayoutDashboard, ShoppingBag, Calendar, Plus, Trash2, ExternalLink, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
      collections,
      submissions,
      bookings,
      addCollectionItem,
      deleteCollectionItem,
      updateSubmissionStatus,
      updateBookingStatus,
      // new auth props
      isAuthenticated,
      isLoadingAuth,
      fetchAdminData,
      logout
  } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'inbox'>('overview');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    tags: '',
    affiliateLink: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return alert('Please select an image');

    setUploadLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', uploadForm.title);
    formData.append('subtitle', uploadForm.subtitle);
    formData.append('description', uploadForm.description);
    formData.append('tags', uploadForm.tags); // server parses comma separated string
    formData.append('affiliateLink', uploadForm.affiliateLink);

    await addCollectionItem(formData);
    setUploadLoading(false);
    setIsUploadOpen(false);
    // Reset form
    setUploadForm({ title: '', subtitle: '', description: '', tags: '', affiliateLink: '' });
    setSelectedFile(null);
  };

  useEffect(() => {
    if (!isLoadingAuth) {
        if (!isAuthenticated) {
            navigate('/admin');
        } else {
            fetchAdminData();
        }
    }
  }, [isAuthenticated, isLoadingAuth, navigate, fetchAdminData]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');
  const pendingBookings = bookings.filter(b => b.status === 'pending');

  if (isLoadingAuth) {
      return (
        <div className="min-h-screen bg-eko-black text-white flex items-center justify-center">
            <div className="text-xl animate-pulse">Verifying Access...</div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-eko-black text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-2xl font-serif font-bold text-eko-gold mb-10">EKO AGENCY</h2>

        <nav className="space-y-2 flex-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-eko-gold text-eko-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'portfolio' ? 'bg-eko-gold text-eko-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <ShoppingBag className="w-5 h-5" />
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'inbox' ? 'bg-eko-gold text-eko-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Calendar className="w-5 h-5" />
            Inbox
            {(pendingSubmissions.length + pendingBookings.length) > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingSubmissions.length + pendingBookings.length}
              </span>
            )}
          </button>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors px-4 py-3">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h3 className="text-gray-400 text-sm mb-2">Total Portfolio Items</h3>
                <p className="text-4xl font-bold text-eko-gold">{collections.length}</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h3 className="text-gray-400 text-sm mb-2">Pending Submissions</h3>
                <p className="text-4xl font-bold text-white">{pendingSubmissions.length}</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h3 className="text-gray-400 text-sm mb-2">New Bookings</h3>
                <p className="text-4xl font-bold text-white">{pendingBookings.length}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
              <p className="text-gray-400">No recent activity logged.</p>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Portfolio Manager</h1>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="bg-eko-gold text-eko-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-amber-500 hover:text-black transition-colors"
              >
                <Plus className="w-5 h-5" /> Add New Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map(item => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                  <div className="h-48 overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button
                        onClick={() => deleteCollectionItem(item.id)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{item.subtitle}</p>
                    {item.affiliateLink && (
                      <div className="flex items-center gap-1 text-xs text-eko-green">
                        <ExternalLink className="w-3 h-3" /> Affiliate Linked
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Modal */}
            {isUploadOpen && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                <div className="bg-eko-black border border-white/10 rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-6">Upload New Collection</h2>
                  <form onSubmit={handleUploadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Image (Required)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-eko-gold outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Title (Required)</label>
                      <input
                        type="text"
                        value={uploadForm.title}
                        onChange={e => setUploadForm({...uploadForm, title: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-eko-gold outline-none"
                        required
                        placeholder="e.g. The Lagos Gala"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={uploadForm.subtitle}
                        onChange={e => setUploadForm({...uploadForm, subtitle: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-eko-gold outline-none"
                        placeholder="e.g. Owambe Excellence"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Description / Quote</label>
                      <textarea
                        value={uploadForm.description}
                        onChange={e => setUploadForm({...uploadForm, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-eko-gold outline-none h-24"
                        placeholder="Description of the look..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Tags (Comma separated)</label>
                      <input
                        type="text"
                        value={uploadForm.tags}
                        onChange={e => setUploadForm({...uploadForm, tags: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-eko-gold outline-none"
                        placeholder="e.g. Aso Ebi, Wedding, Luxury"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Affiliate Link</label>
                      <input
                        type="url"
                        value={uploadForm.affiliateLink}
                        onChange={e => setUploadForm({...uploadForm, affiliateLink: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-eko-gold outline-none"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsUploadOpen(false)}
                        className="flex-1 bg-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={uploadLoading}
                        className="flex-1 bg-eko-gold text-eko-black py-3 rounded-lg font-bold hover:bg-amber-500 hover:text-black transition-colors disabled:opacity-50"
                      >
                        {uploadLoading ? 'Uploading...' : 'Upload Item'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'inbox' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Brand Submissions
                <span className="text-sm font-normal text-gray-400 bg-white/10 px-2 py-1 rounded-full">{submissions.length}</span>
              </h2>
              <div className="space-y-4">
                {submissions.length === 0 ? <p className="text-gray-400">No submissions yet.</p> : (
                  submissions.map(sub => (
                    <div key={sub.id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">{sub.brandName}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            sub.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                            sub.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                            'bg-red-500/20 text-red-500'
                          }`}>
                            {sub.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-2">{sub.description}</p>
                        <p className="text-sm text-gray-500">{sub.contactEmail} • {new Date(sub.dateSubmitted).toLocaleDateString()}</p>
                      </div>
                      {sub.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateSubmissionStatus(sub.id, 'approved')}
                            className="bg-eko-green text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateSubmissionStatus(sub.id, 'rejected')}
                            className="bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-1 rounded text-sm hover:bg-red-500 hover:text-white"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                Client Bookings
                <span className="text-sm font-normal text-gray-400 bg-white/10 px-2 py-1 rounded-full">{bookings.length}</span>
              </h2>
              <div className="space-y-4">
                {bookings.length === 0 ? <p className="text-gray-400">No bookings yet.</p> : (
                  bookings.map(booking => (
                    <div key={booking.id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">{booking.clientName}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                            booking.status === 'confirmed' ? 'bg-green-500/20 text-green-500' :
                            'bg-blue-500/20 text-blue-500'
                          }`}>
                            {booking.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-1">{booking.eventType} on {booking.date}</p>
                        <p className="text-sm text-gray-500">Budget: {booking.budget} • {booking.email}</p>
                      </div>
                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="bg-eko-green text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            className="bg-blue-500/20 text-blue-500 border border-blue-500/50 px-3 py-1 rounded text-sm hover:bg-blue-500 hover:text-white"
                          >
                            Complete
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
