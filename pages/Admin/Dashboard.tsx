import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { LayoutDashboard, ShoppingBag, Calendar, Plus, Trash2, ExternalLink, LogOut, Download, Menu, X } from 'lucide-react';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoadingAuth, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  // Download individual submission with media + details
  // Download individual submission with media + details
  const handleDownloadSubmission = async (sub: any, index: number) => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    // 1. Fetch and add media file if exists
    if (sub.mediaUrl) {
      try {
        const response = await fetch(sub.mediaUrl);
        const blob = await response.blob();
        const extension = sub.mediaType === 'video' ? 'mp4' : 'jpg';
        zip.file(`${sub.brandName.replace(/[^a-z0-9]/gi, '_')}.${extension}`, blob);
      } catch (error) {
        console.error('Failed to download media:', error);
      }
    }

    // 2. Add details as text file
    const details = `
Brand Name: ${sub.brandName}
Contact Email: ${sub.contactEmail}
Description: ${sub.description}
Status: ${sub.status}
Date Submitted: ${new Date(sub.dateSubmitted).toLocaleString()}
Media Type: ${sub.mediaType || 'No media'}
    `.trim();

    zip.file('details.txt', details);

    // 3. Generate and download ZIP
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${sub.brandName.replace(/[^a-z0-9]/gi, '_')}-submission.zip`);
  };

  // Download all submissions
  const handleDownloadAllSubmissions = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    for (let i = 0; i < submissions.length; i++) {
      const sub = submissions[i];
      const folderName = `${i + 1}_${sub.brandName.replace(/[^a-z0-9]/gi, '_')}`;

      // Add media file
      if (sub.mediaUrl) {
        try {
          const response = await fetch(sub.mediaUrl);
          const blob = await response.blob();
          const extension = sub.mediaType === 'video' ? 'mp4' : 'jpg';
          zip.file(`${folderName}/media.${extension}`, blob);
        } catch (error) {
          console.error(`Failed to download media for ${sub.brandName}:`, error);
        }
      }

      // Add details
      const details = `
Brand Name: ${sub.brandName}
Contact Email: ${sub.contactEmail}
Description: ${sub.description}
Status: ${sub.status}
Date Submitted: ${new Date(sub.dateSubmitted).toLocaleString()}
Media Type: ${sub.mediaType || 'No media'}
      `.trim();

      zip.file(`${folderName}/details.txt`, details);
    }

    // Generate and download
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `all-submissions-${new Date().toISOString().split('T')[0]}.zip`);
  };

  // Download individual booking
  const handleDownloadBooking = async (booking: any) => {
    const { saveAs } = await import('file-saver');
    const details = `
Client Name: ${booking.clientName}
Email: ${booking.email}
Event Type: ${booking.eventType}
Event Date: ${booking.date}
Budget: ${booking.budget}
Status: ${booking.status}
Date Requested: ${new Date(booking.dateRequested).toLocaleString()}
    `.trim();

    const blob = new Blob([details], { type: 'text/plain' });
    saveAs(blob, `${booking.clientName.replace(/[^a-z0-9]/gi, '_')}-booking.txt`);
  };

  // Download all bookings
  const handleDownloadAllBookings = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    bookings.forEach((booking, index) => {
      const details = `
Client Name: ${booking.clientName}
Email: ${booking.email}
Event Type: ${booking.eventType}
Event Date: ${booking.date}
Budget: ${booking.budget}
Status: ${booking.status}
Date Requested: ${new Date(booking.dateRequested).toLocaleString()}
      `.trim();

      const fileName = `${index + 1}_${booking.clientName.replace(/[^a-z0-9]/gi, '_')}.txt`;
      zip.file(fileName, details);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `all-bookings-${new Date().toISOString().split('T')[0]}.zip`);
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
    <div className="min-h-screen bg-eko-black text-white font-sans">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-eko-black/95 backdrop-blur-sm border-b border-white/10 p-4 flex items-center justify-between">
        <h2 className="text-xl font-serif font-bold text-eko-gold">EKO AGENCY</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex pt-16 lg:pt-0">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 border-r border-white/10 p-6 flex flex-col bg-black md:bg-transparent rounded-2xl
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:pt-6 pt-20
        `}>
          <h2 className="text-2xl font-serif font-bold text-eko-gold mb-10 hidden lg:block">EKO AGENCY</h2>

          <nav className="space-y-2 flex-1">
            <button
              onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-eko-gold text-eko-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Overview
            </button>
            <button
              onClick={() => { setActiveTab('portfolio'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'portfolio' ? 'bg-eko-gold text-eko-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              Portfolio
            </button>
            <button
              onClick={() => { setActiveTab('inbox'); setIsSidebarOpen(false); }}
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
                        type="text"
                        value={uploadForm.affiliateLink}
                        onChange={e => setUploadForm({...uploadForm, affiliateLink: e.target.value})}
                        onBlur={() => {
                          if (uploadForm.affiliateLink && !uploadForm.affiliateLink.match(/^https?:\/\//)) {
                            setUploadForm(prev => ({ ...prev, affiliateLink: `https://${prev.affiliateLink}` }));
                          }
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:border-eko-gold outline-none"
                        placeholder="e.g. www.example.com"
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Brand Submissions
                  <span className="text-sm font-normal text-gray-400 bg-white/10 px-2 py-1 rounded-full">{submissions.length}</span>
                </h2>
                {import.meta.env.VITE_USE_DATABASE === 'true' && (
                  <button
                    onClick={handleDownloadAllSubmissions}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {submissions.length === 0 ? <p className="text-gray-400">No submissions yet.</p> : (
                  submissions.map(sub => (
                    <div key={sub.id} className="bg-white/5 border border-white/10 p-6 rounded-xl flex gap-4">
                      {sub.mediaUrl && (
                        <div className="flex-shrink-0">
                          {sub.mediaType === 'video' ? (
                            <video
                              src={sub.mediaUrl}
                              className="w-32 h-32 object-cover rounded-lg"
                              controls
                            />
                          ) : (
                            <img
                              src={sub.mediaUrl}
                              alt={sub.brandName}
                              className="w-32 h-32 object-cover rounded-lg"
                            />
                          )}
                        </div>
                      )}
                      <div className="flex-1">
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

                        <div className="flex gap-2 mt-4">
                          {import.meta.env.VITE_USE_DATABASE === 'true' && (
                            <button
                              onClick={() => handleDownloadSubmission(sub, submissions.indexOf(sub))}
                              className="bg-blue-500/20 text-blue-500 border border-blue-500/50 px-3 py-1 rounded text-sm hover:bg-blue-500 hover:text-white flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          )}
                          {sub.status === 'pending' && (
                            <>
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
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Client Bookings
                  <span className="text-sm font-normal text-gray-400 bg-white/10 px-2 py-1 rounded-full">{bookings.length}</span>
                </h2>
                {import.meta.env.VITE_USE_DATABASE === 'true' && (
                  <button
                    onClick={handleDownloadAllBookings}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download All
                  </button>
                )}
              </div>
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

                        <div className="mt-4">
                          {import.meta.env.VITE_USE_DATABASE === 'true' && (
                            <button
                              onClick={() => handleDownloadBooking(booking)}
                              className="bg-blue-500/20 text-blue-500 border border-blue-500/50 px-3 py-1 rounded text-sm hover:bg-blue-500 hover:text-white flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          )}
                        </div>
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
    </div>
  );
};

export default Dashboard;
