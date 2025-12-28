import React, { useState } from 'react';
import { toast } from 'sonner';
import { Lock, Bell, User, Key, ShieldAlert } from 'lucide-react';

interface SettingsPanelProps {
  initial_tab?: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ initial_tab = 'general' }) => {
  const [activeTab, setActiveTab] = useState(initial_tab);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const handleSave = () => {
    // Simulate save
    toast.success('Settings updated successfully', {
      description: 'Your changes have been synced to the cloud.',
    });
  };

  const generateKey = () => {
    // Fake API Key Generation
    const fakeKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(fakeKey);
    toast.message('API Key Generated', {
      description: 'Copy this key immediately. It will not be shown again.',
      action: {
        label: 'Copy',
        onClick: () => {
            navigator.clipboard.writeText(fakeKey);
            toast.success('Copied to clipboard');
        }
      }
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[500px] bg-base-100 border border-base-content/10 rounded-xl shadow-sm overflow-hidden">
      {/* LEFT SIDEBAR TABS */}
      <div className="w-full md:w-64 bg-base-200/50 p-4 border-b md:border-b-0 md:border-r border-base-content/10">
        <h2 className="text-xs font-bold uppercase tracking-wider opacity-50 mb-4 px-2">Settings</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-content shadow-sm' 
                  : 'hover:bg-base-300/50 text-base-content/70'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">
        {activeTab === 'general' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
                <h3 className="text-lg font-bold">Profile Information</h3>
                <p className="text-sm opacity-60">Update your account details and public profile.</p>
            </div>
            <div className="grid gap-4 max-w-lg">
                <div className="form-control">
                    <label className="label">Display Name</label>
                    <input type="text" className="input input-bordered" defaultValue="Alex Dev" />
                </div>
                <div className="form-control">
                    <label className="label">Email Address</label>
                    <input type="email" className="input input-bordered" defaultValue="alex@universal.app" disabled />
                    <label className="label"><span className="label-text-alt text-warning">Email change requires verification</span></label>
                </div>
            </div>
            <div className="divider"></div>
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-bold text-sm">Dark Mode</h4>
                    <p className="text-xs opacity-60">Sync with system preference</p>
                </div>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </div>
          </div>
        )}

        {activeTab === 'api' && (
           <div className="space-y-6 animate-in fade-in duration-300">
             <div>
                <h3 className="text-lg font-bold">Developer Keys</h3>
                <p className="text-sm opacity-60">Manage your secret keys for API access.</p>
             </div>
             
             <div className="card bg-base-200 border border-base-content/5">
                <div className="card-body">
                    {apiKey ? (
                        <div className="flex flex-col gap-2">
                             <span className="text-xs font-bold uppercase text-success">Active Key</span>
                             <code className="bg-base-100 p-3 rounded-lg font-mono text-sm break-all border border-success/30 text-success">
                                {apiKey}
                             </code>
                             <p className="text-xs opacity-50 mt-2">Do not share this key with anyone.</p>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                             <Key size={32} className="mx-auto mb-4 opacity-20" />
                             <p className="text-sm font-medium opacity-60 mb-4">You haven't generated an API key yet.</p>
                             <button className="btn btn-primary" onClick={generateKey}>Generate Secret Key</button>
                        </div>
                    )}
                </div>
             </div>
           </div>
        )}

        {/* Footer Actions for all tabs */}
        <div className="mt-12 pt-6 border-t border-base-content/10 flex justify-end gap-3">
             <button className="btn btn-ghost">Cancel</button>
             <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
        </div>

        {/* DANGER ZONE */}
        <div className="mt-12 pt-12 border-t border-base-content/10">
            <div className="border border-error/20 bg-error/5 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-error/10 text-error rounded-lg">
                        <ShieldAlert size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-error">Danger Zone</h4>
                        <p className="text-xs opacity-60">Once you delete your account, there is no going back.</p>
                    </div>
                </div>
                <button className="btn btn-error btn-sm btn-outline" onClick={() => toast.error("Action blocked by safety protocols.")}>Delete Account</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;