import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NavigationMenu from '../components/NavigationMenu';

const PurchaseSetup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [serverId, setServerId] = useState('');
  const [ownerDiscordId, setOwnerDiscordId] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      features: [
        '1 Discord Server',
        'Basic Widgets',
        '24/7 Bot Uptime',
        'Standard Support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 19.99,
      features: [
        '3 Discord Servers',
        'All Basic + Premium Widgets',
        '24/7 Bot Uptime',
        'Priority Support',
        'Custom Commands'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 39.99,
      features: [
        'Unlimited Discord Servers',
        'All Widgets + Early Access',
        '24/7 Bot Uptime',
        'Priority Support',
        'Custom Commands',
        'White-labeled Bot',
        'Developer API Access'
      ]
    }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would submit the form data to your backend
      console.log('Purchase setup submitted:', {
        serverId,
        ownerDiscordId,
        additionalInfo,
        plan: selectedPlan
      });
      
      // Navigate to success page or dashboard
      navigate('/');
    } catch (error) {
      console.error('Error submitting purchase setup:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 flex overflow-hidden">
          <NavigationMenu />
          
          <main className="flex-1 overflow-y-auto bg-discord-dark p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-8">Bot Hosting Purchase Setup</h1>
              
              <div className="bg-discord-darker rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">
                        {step === 1 ? 'Select a Hosting Plan' : 
                         step === 2 ? 'Server Information' : 
                         'Payment Information'}
                      </h2>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-discord-blue' : 'bg-gray-600'}`}></div>
                        <div className={`w-16 h-1 ${step >= 2 ? 'bg-discord-blue' : 'bg-gray-600'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-discord-blue' : 'bg-gray-600'}`}></div>
                        <div className={`w-16 h-1 ${step >= 3 ? 'bg-discord-blue' : 'bg-gray-600'}`}></div>
                        <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-discord-blue' : 'bg-gray-600'}`}></div>
                      </div>
                    </div>
                    
                    {step === 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map(plan => (
                          <div
                            key={plan.id}
                            className={`border rounded-lg p-6 transition-colors cursor-pointer ${
                              selectedPlan === plan.id 
                                ? 'border-discord-blue bg-discord-blue bg-opacity-10' 
                                : 'border-gray-700 hover:border-discord-blue'
                            }`}
                            onClick={() => setSelectedPlan(plan.id)}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-semibold">{plan.name}</h3>
                              <div className="bg-discord-darker px-2 py-1 rounded">
                                ${plan.price}/mo
                              </div>
                            </div>
                            
                            <ul className="space-y-2 mb-4">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-discord-green mr-2">✓</span>
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <button
                              className={`w-full py-2 rounded-md font-medium ${
                                selectedPlan === plan.id
                                  ? 'bg-discord-blue text-white'
                                  : 'bg-discord-dark text-gray-300 hover:bg-discord-dark/80'
                              }`}
                              onClick={() => setSelectedPlan(plan.id)}
                            >
                              Select Plan
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {step === 2 && (
                      <form>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="serverId" className="block text-sm font-medium text-gray-300 mb-1">
                              Discord Server ID
                            </label>
                            <input
                              id="serverId"
                              type="text"
                              className="input"
                              value={serverId}
                              onChange={(e) => setServerId(e.target.value)}
                              placeholder="e.g. 123456789012345678"
                              required
                            />
                            <p className="mt-1 text-sm text-gray-400">
                              Enable Developer Mode in Discord, then right-click your server and select "Copy ID"
                            </p>
                          </div>
                          
                          <div>
                            <label htmlFor="ownerDiscordId" className="block text-sm font-medium text-gray-300 mb-1">
                              Your Discord User ID
                            </label>
                            <input
                              id="ownerDiscordId"
                              type="text"
                              className="input"
                              value={ownerDiscordId}
                              onChange={(e) => setOwnerDiscordId(e.target.value)}
                              placeholder="e.g. 123456789012345678"
                              required
                            />
                            <p className="mt-1 text-sm text-gray-400">
                              Right-click your username in Discord and select "Copy ID"
                            </p>
                          </div>
                          
                          <div>
                            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-1">
                              Additional Information (optional)
                            </label>
                            <textarea
                              id="additionalInfo"
                              className="input min-h-[100px]"
                              value={additionalInfo}
                              onChange={(e) => setAdditionalInfo(e.target.value)}
                              placeholder="Any specific requirements or questions about your bot hosting"
                            />
                          </div>
                        </div>
                      </form>
                    )}
                    
                    {step === 3 && (
                      <div>
                        <div className="bg-discord-darkest p-6 rounded-lg mb-6">
                          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Plan</span>
                              <span>{plans.find(p => p.id === selectedPlan)?.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Price</span>
                              <span>${plans.find(p => p.id === selectedPlan)?.price}/month</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Billing</span>
                              <span>Monthly</span>
                            </div>
                            <div className="border-t border-gray-700 pt-3 mt-3">
                              <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${plans.find(p => p.id === selectedPlan)?.price}/month</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                              Card Number
                            </label>
                            <input
                              id="cardNumber"
                              type="text"
                              className="input"
                              placeholder="0000 0000 0000 0000"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry" className="block text-sm font-medium text-gray-300 mb-1">
                                Expiry Date
                              </label>
                              <input
                                id="expiry"
                                type="text"
                                className="input"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                                CVV
                              </label>
                              <input
                                id="cvv"
                                type="text"
                                className="input"
                                placeholder="123"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                              Name on Card
                            </label>
                            <input
                              id="name"
                              type="text"
                              className="input"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    {step > 1 ? (
                      <button
                        className="btn btn-outline"
                        onClick={() => setStep(step - 1)}
                        disabled={submitting}
                      >
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    {step < 3 ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => setStep(step + 1)}
                        disabled={step === 1 && !selectedPlan}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={submitting}
                      >
                        {submitting ? 'Processing...' : 'Complete Purchase'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSetup;
 