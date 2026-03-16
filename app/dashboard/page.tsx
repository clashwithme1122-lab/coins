'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Package, MessageCircle, Truck, CreditCard, Settings, LogOut, Clock, TrendingUp, Award, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AdminChat from '@/components/AdminChat';
import DashboardChat from '@/components/DashboardChatFallback';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: string;
}

interface ProfileFormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface WonAuction {
  id: string;
  title: string;
  finalPrice: number;
  wonAt: string;
  trackingNumber?: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  image: string;
  purchaseType?: string;
  purchasePrice?: number;
  purchasedAt?: string;
}

interface ActiveBid {
  id: string;
  title: string;
  currentBid: number;
  yourBid: number;
  endsAt: string;
  image: string;
  status: 'winning' | 'outbid';
  auctionId?: string;
  isEnded?: boolean;
}

export default function DashboardPage() {
  const { user: authUser, logout } = useAuth();
  const router = useRouter();
  const [activeBids, setActiveBids] = useState<ActiveBid[]>([]);
  const [wonAuctions, setWonAuctions] = useState<WonAuction[]>([]);
  const [purchasedAuctions, setPurchasedAuctions] = useState<WonAuction[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'bids' | 'won' | 'purchased' | 'profile' | 'messages'>('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    // Set auth loading to false when auth context is ready
    setAuthLoading(false);
  }, [authUser]);

  useEffect(() => {
    // Don't redirect immediately, wait for auth to load
    if (!authLoading && !authUser) {
      router.push('/auth/login');
      return;
    }

    // Only load data if user is authenticated
    if (authUser && !authLoading) {
      // Load user's auction data and profile
      loadUserAuctions(authUser.uid);
      loadUserProfile(authUser.uid);
      setLoading(false);
    }
  }, [authUser, router, authLoading]);

  const loadUserAuctions = async (userId: string) => {
    try {
      setLoading(true);

      console.log(`Loading auctions for userId: ${userId}`);

      // Fetch active bids
      const activeBidsResponse = await fetch(`/api/bids?userId=${userId}&type=active`);
      const activeBidsData = activeBidsResponse.ok ? await activeBidsResponse.json() : { bids: [] };
      console.log('Active bids response:', activeBidsData);
      console.log('Active bids data.bids:', activeBidsData.bids);
      console.log('Setting active bids to:', activeBidsData.bids || []);

      // Fetch won auctions
      const wonAuctionsResponse = await fetch(`/api/bids?userId=${userId}&type=won`);
      const wonAuctionsData = wonAuctionsResponse.ok ? await wonAuctionsResponse.json() : { auctions: [] };
      console.log('Won auctions response:', wonAuctionsData);

      // Fetch purchased auctions (NEW)
      const purchasedAuctionsResponse = await fetch(`/api/bids?userId=${userId}&type=purchased`);
      const purchasedAuctionsData = purchasedAuctionsResponse.ok ? await purchasedAuctionsResponse.json() : { auctions: [] };
      console.log('Purchased auctions response:', purchasedAuctionsData);

      setActiveBids(activeBidsData.bids || []);
      setWonAuctions(wonAuctionsData.auctions || []);
      setPurchasedAuctions(purchasedAuctionsData.auctions || []);
      
      console.log(`Set active bids: ${activeBidsData.bids?.length || 0}`);
      console.log('Current activeBids state after setting:', activeBidsData.bids || []);
      console.log(`Set won auctions: ${wonAuctionsData.auctions?.length || 0}`);
      console.log(`Set purchased auctions: ${purchasedAuctionsData.auctions?.length || 0}`);
    } catch (error) {
      console.error('Error loading user auctions:', error);
      // Set empty arrays on error
      setActiveBids([]);
      setWonAuctions([]);
      setPurchasedAuctions([]);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (userId: string) => {
    try {
      // Load user profile from Firestore
      const response = await fetch(`/api/auth/user?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProfileData({
            name: data.user.name || authUser?.displayName || '',
            phone: data.user.phone || authUser?.phoneNumber || '',
            address: data.user.address || '',
            city: data.user.city || '',
            state: data.user.state || '',
            zipCode: data.user.zipCode || '',
            country: data.user.country || ''
          });
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Set default values from auth user
      setProfileData({
        name: authUser?.displayName || '',
        phone: authUser?.phoneNumber || '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      });
    }
  };

  const handleProfileUpdate = async () => {
    if (!authUser) return;
    
    setProfileLoading(true);
    try {
      const response = await fetch('/api/auth/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: authUser.uid,
          ...profileData
        })
      });

      if (response.ok) {
        setIsEditingProfile(false);
        // Show success message
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handlePlaceBid = async (auctionId: string, currentBid: number) => {
    if (!authUser) return;
    
    const bidAmount = prompt(`Enter your bid (must be higher than $${currentBid}):`);
    if (!bidAmount) return;
    
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= currentBid) {
      alert('Please enter a valid amount higher than the current bid.');
      return;
    }

    try {
      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: authUser.uid,
          auctionId,
          amount
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Bid placed successfully!');
        // Reload the user's auctions to show updated data
        await loadUserAuctions(authUser.uid);
      } else {
        alert(data.error || 'Failed to place bid. Please try again.');
      }
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatTimeLeft = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const difference = end - now;

    if (difference <= 0) return 'Ended';
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">CoinAuction</Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/auction" className="text-gray-600 hover:text-gray-900">Auctions</Link>
                <Link href="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {authUser?.displayName || authUser?.email || 'User'}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{authUser?.displayName || 'User'}</h3>
                  <p className="text-sm text-gray-600">{authUser?.email || 'No email'}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('bids')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'bids' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Active Bids</span>
                </button>
                <button
                  onClick={() => setActiveTab('won')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'won' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Award className="w-5 h-5" />
                  <span>Won Auctions</span>
                </button>
                <button
                  onClick={() => setActiveTab('purchased')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'purchased' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Purchased</span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'messages' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Messages</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                    activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Profile Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Active Bids</p>
                          <p className="text-2xl font-bold text-blue-900">{activeBids.length}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 font-medium">Won Auctions</p>
                          <p className="text-2xl font-bold text-green-900">{wonAuctions.length}</p>
                        </div>
                        <Award className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-600 font-medium">Total Spent</p>
                          <p className="text-2xl font-bold text-purple-900">
                            {formatPrice(wonAuctions.reduce((sum, item) => sum + item.finalPrice, 0))}
                          </p>
                        </div>
                        <CreditCard className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {activeBids.slice(0, 3).map(bid => (
                      <div key={bid.id} className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center space-x-4">
                          <img src={bid.image} alt={bid.title} className="w-12 h-12 rounded object-cover" />
                          <div>
                            <p className="font-medium text-gray-900">{bid.title}</p>
                            <p className="text-sm text-gray-600">Your bid: {formatPrice(bid.yourBid)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            bid.status === 'winning' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {bid.status === 'winning' ? 'Winning' : 'Outbid'}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{formatTimeLeft(bid.endsAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bids' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Bids</h2>
                <div className="space-y-4">
                  {(() => {
                    console.log('Rendering active bids section, activeBids.length:', activeBids.length);
                    console.log('Rendering active bids data:', activeBids);
                    return null;
                  })()}
                  {activeBids.map(bid => (
                    <div key={bid.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <img src={bid.image} alt={bid.title} className="w-20 h-20 rounded object-cover" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{bid.title}</h3>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-gray-600">Current bid: <span className="font-medium">{formatPrice(bid.currentBid)}</span></p>
                              <p className="text-sm text-gray-600">Your bid: <span className="font-medium">{formatPrice(bid.yourBid)}</span></p>
                              <p className="text-sm text-gray-600">{formatTimeLeft(bid.endsAt)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                            bid.status === 'winning' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {bid.status === 'winning' ? 'Winning' : 'Outbid'}
                          </span>
                          {bid.status === 'outbid' && (
                            <button 
                              onClick={() => handlePlaceBid(bid.auctionId || bid.id, bid.currentBid)}
                              className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                              Place higher bid
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'won' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Won Auctions</h2>
                <div className="space-y-4">
                  {wonAuctions.map(auction => (
                    <div key={auction.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <img src={auction.image} alt={auction.title} className="w-20 h-20 rounded object-cover" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{auction.title}</h3>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-gray-600">Final price: <span className="font-medium">{formatPrice(auction.finalPrice)}</span></p>
                              <p className="text-sm text-gray-600">Won on: <span className="font-medium">{new Date(auction.wonAt).toLocaleDateString()}</span></p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                            Won
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {wonAuctions.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No won auctions yet</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'purchased' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Purchased Items</h2>
                <div className="space-y-4">
                  {purchasedAuctions.map(auction => (
                    <div key={auction.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <img src={auction.image} alt={auction.title} className="w-20 h-20 rounded object-cover" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{auction.title}</h3>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-gray-600">Purchase price: <span className="font-medium">{formatPrice(auction.purchasePrice || 0)}</span></p>
                              <p className="text-sm text-gray-600">Purchased on: <span className="font-medium">{new Date(auction.purchasedAt || auction.wonAt).toLocaleDateString()}</span></p>
                              <p className="text-sm text-gray-600">Type: <span className="font-medium">Buy Now</span></p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800">
                            Purchased
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {purchasedAuctions.length === 0 && (
                    <p className="text-gray-500 text-center py-8">No purchased items yet</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                {!isEditingProfile ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <p className="mt-1 text-gray-900">{profileData.name || authUser?.displayName || 'User'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-gray-900">{authUser?.email || 'No email'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="mt-1 text-gray-900">{profileData.phone || authUser?.phoneNumber || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Member Since</label>
                        <p className="mt-1 text-gray-900">{new Date(authUser?.metadata?.creationTime || Date.now()).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <p className="mt-1 text-gray-900">
                        {profileData.address ? 
                          `${profileData.address}, ${profileData.city}, ${profileData.state} ${profileData.zipCode}, ${profileData.country}` :
                          'Address information not available. Please update your profile to add address details.'
                        }
                      </p>
                    </div>

                    <div className="pt-6 border-t">
                      <button 
                        onClick={() => setIsEditingProfile(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                          type="text"
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          value={profileData.city}
                          onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          value={profileData.state}
                          onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                          type="text"
                          value={profileData.zipCode}
                          onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                          type="text"
                          value={profileData.country}
                          onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t flex space-x-4">
                      <button 
                        onClick={handleProfileUpdate}
                        disabled={profileLoading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {profileLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button 
                        onClick={() => setIsEditingProfile(false)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Admin Support Chat</h2>
                <div className="h-[600px]">
                  <DashboardChat />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
