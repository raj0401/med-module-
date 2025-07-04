
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pill, Plus, Calendar, Clock, Activity, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Prescription {
  id: number;
  medicineName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  status: 'active' | 'completed' | 'discontinued';
}

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    medicineName: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
    instructions: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load sample prescriptions
    setPrescriptions([
      {
        id: 1,
        medicineName: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        instructions: 'Take with water, preferably in the morning',
        status: 'active'
      },
      {
        id: 2,
        medicineName: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        instructions: 'Take with meals to reduce stomach upset',
        status: 'active'
      },
      {
        id: 3,
        medicineName: 'Ibuprofen',
        dosage: '200mg',
        frequency: 'As needed',
        startDate: '2023-12-15',
        endDate: '2024-01-15',
        instructions: 'For pain relief, do not exceed 3 doses per day',
        status: 'completed'
      }
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPrescription: Prescription = {
      id: Date.now(),
      medicineName: formData.medicineName,
      dosage: formData.dosage,
      frequency: formData.frequency,
      startDate: formData.startDate,
      endDate: formData.endDate,
      instructions: formData.instructions,
      status: 'active'
    };

    setPrescriptions([...prescriptions, newPrescription]);
    setFormData({
      medicineName: '',
      dosage: '',
      frequency: '',
      startDate: '',
      endDate: '',
      instructions: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Prescription added!",
      description: "Your prescription has been added successfully.",
    });
  };

  const handleDiscontinue = (id: number) => {
    setPrescriptions(prescriptions.map(rx => 
      rx.id === id ? { ...rx, status: 'discontinued' as const } : rx
    ));
    
    toast({
      title: "Prescription discontinued",
      description: "The prescription has been discontinued.",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'discontinued':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const activePrescriptions = prescriptions.filter(rx => rx.status === 'active');
  const inactivePrescriptions = prescriptions.filter(rx => rx.status !== 'active');

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
            <p className="text-gray-600 mt-2">
              Manage your medications and prescription schedules
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Prescription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Prescription</DialogTitle>
                <DialogDescription>
                  Add a new medication to your prescription list
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicineName">Medicine Name</Label>
                  <div className="relative">
                    <Pill className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="medicineName"
                      name="medicineName"
                      placeholder="Enter medicine name"
                      value={formData.medicineName}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      name="dosage"
                      placeholder="e.g., 10mg"
                      value={formData.dosage}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input
                      id="frequency"
                      name="frequency"
                      placeholder="e.g., Twice daily"
                      value={formData.frequency}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Input
                    id="instructions"
                    name="instructions"
                    placeholder="Special instructions (optional)"
                    value={formData.instructions}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Add Prescription
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Active Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Active Prescriptions</CardTitle>
            <CardDescription>
              Your current medications and schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activePrescriptions.length > 0 ? (
              <div className="space-y-4">
                {activePrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {prescription.medicineName}
                          </h3>
                          <Badge className={getStatusColor(prescription.status)}>
                            {prescription.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Pill className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              <strong>Dosage:</strong> {prescription.dosage}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              <strong>Frequency:</strong> {prescription.frequency}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              <strong>Duration:</strong> {new Date(prescription.startDate).toLocaleDateString()} - {new Date(prescription.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {prescription.instructions && (
                          <div className="bg-blue-50 p-3 rounded-lg mb-4">
                            <p className="text-sm text-blue-800">
                              <strong>Instructions:</strong> {prescription.instructions}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDiscontinue(prescription.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-4"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Discontinue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No active prescriptions</p>
                <p className="text-sm text-gray-400">Add your first prescription to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Past Prescriptions */}
        {inactivePrescriptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Past Prescriptions</CardTitle>
              <CardDescription>
                Your prescription history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inactivePrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {prescription.medicineName}
                          </h3>
                          <Badge className={getStatusColor(prescription.status)}>
                            {prescription.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Pill className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              <strong>Dosage:</strong> {prescription.dosage}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              <strong>Frequency:</strong> {prescription.frequency}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              <strong>Duration:</strong> {new Date(prescription.startDate).toLocaleDateString()} - {new Date(prescription.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {prescription.instructions && (
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Instructions:</strong> {prescription.instructions}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Prescriptions;
