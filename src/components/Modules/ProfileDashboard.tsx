import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldCheck, Award, MapPin, Calendar, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileDashboardProps {
  banner_url?: string;
  show_badges?: boolean;
}

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ 
  banner_url = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop", 
  show_badges = true 
}) => {
  const { session } = useAuth();
  const userEmail = session?.user?.email || "user@example.com";
  const username = userEmail.split('@')[0];

  const handleEdit = () => {
    toast("Edit Profile mode is currently disabled in preview.", {
      description: "This feature will be available in the next release."
    });
  }

  return (
    <div className="w-full">
      {/* 1. HERO COVER */}
      <div 
        className="h-48 md:h-64 w-full bg-cover bg-center rounded-2xl shadow-inner relative group"
        style={{ backgroundImage: `url(${banner_url})` }}
      >
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-2xl"></div>
        <button className="btn btn-sm btn-circle absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-base-100/80 backdrop-blur border-none">
            <Edit2 size={14} />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-end md:items-center gap-6">
            
            {/* 2. FLOATING AVATAR */}
            <div className="avatar placeholder ring-4 ring-base-100 rounded-full shadow-2xl bg-base-100">
                <div className="bg-neutral text-neutral-content rounded-full w-32 md:w-40 text-4xl font-light">
                     {username.charAt(0).toUpperCase()}
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-4 border-base-100" title="Online"></div>
            </div>

            <div className="flex-1 pb-2 md:pb-0 pt-4 md:pt-16">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h1 className="text-3xl font-bold">{username}</h1>
                    {show_badges && (
                        <div className="flex gap-2">
                            <div className="badge badge-primary gap-1"><ShieldCheck size={12} /> PRO</div>
                            <div className="badge badge-outline gap-1"><Award size={12} /> Early Adopter</div>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-sm opacity-60">
                    <span className="flex items-center gap-1"><MapPin size={14} /> San Francisco, CA</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> Joined March 2024</span>
                </div>
            </div>

            {/* 3. COMPLETION WIDGET */}
            <div className="hidden md:flex flex-col items-center gap-2 bg-base-100 p-4 rounded-xl shadow-sm border border-base-content/5 mt-16 md:mt-0">
                <div className="radial-progress text-primary text-xs font-bold" style={{"--value":60, "--size": "3rem"} as any}>
                    60%
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide opacity-50">Profile Strength</span>
            </div>
        </div>

        {/* 4. TABS & CONTENT */}
        <div className="mt-12">
            <div role="tablist" className="tabs tabs-bordered tabs-lg">
                <a role="tab" className="tab tab-active font-medium">Overview</a>
                <a role="tab" className="tab font-medium">Activity</a>
                <a role="tab" className="tab font-medium">Settings</a>
            </div>
            
            <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Bio */}
                <div className="md:col-span-2 space-y-8">
                     <div className="card bg-base-100 border border-base-content/10 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-lg">About</h3>
                            <p className="opacity-70 leading-relaxed">
                                Product Designer and Full-stack developer passionate about building server-driven user interfaces. Currently managing the Universal App Factory.
                            </p>
                            <button className="btn btn-sm btn-outline w-fit mt-4" onClick={handleEdit}>Edit Bio</button>
                        </div>
                     </div>
                </div>

                {/* Right Column: Stats */}
                <div className="space-y-4">
                     <div className="card bg-base-100 border border-base-content/10 shadow-sm">
                        <div className="card-body p-4">
                            <h3 className="text-xs font-bold uppercase opacity-50 mb-4">Workspace Stats</h3>
                            <div className="flex justify-between items-center py-2 border-b border-base-content/5">
                                <span className="text-sm">Projects</span>
                                <span className="font-bold">12</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-base-content/5">
                                <span className="text-sm">Team Members</span>
                                <span className="font-bold">4</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm">Views</span>
                                <span className="font-bold">1.2k</span>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;