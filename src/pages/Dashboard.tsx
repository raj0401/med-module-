
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Pill, Clock, TrendingUp, Heart, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Appointment {
  id: number;
  doctorName: string;
  appointmentDate: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface Prescription {
  id: number;
  medicineName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    // Load sample data
    setAppointments([
      {
        id: 1,
        doctorName: 'Dr. Sarah Johnson',
        appointmentDate: '2024-01-15',
        reason: 'Annual Checkup',
        status: 'scheduled'
      },
      {
        id: 2,
        doctorName: 'Dr. Michael Chen',
        appointmentDate: '2024-01-20',
        reason: 'Follow-up',
        status: 'scheduled'
      }
    ]);

    setPrescriptions([
      {
        id: 1,
        medicineName: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      },
      {
        id: 2,
        medicineName: 'Metformin',
        dosage: '500mg',
        frequency: 'Twice daily',
        startDate: '2024-01-01',
        endDate: '2024-06-30'
      }
    ]);
  }, []);

  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled').slice(0, 3);
  const activePrescriptions = prescriptions.slice(0, 3);

  const stats = [
    {
      title: 'Upcoming Appointments',
      value: upcomingAppointments.length,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Prescriptions',
      value: activePrescriptions.length,
      icon: Pill,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Health Score',
      value: '85%',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Care Team',
      value: '3',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your health management dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Appointments</span>
              </CardTitle>
              <CardDescription>
                Your next scheduled medical appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.doctorName}</h4>
                      <p className="text-sm text-gray-600">{appointment.reason}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {appointment.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
              )}
            </CardContent>
          </Card>

          {/* Active Prescriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="h-5 w-5" />
                <span>Active Prescriptions</span>
              </CardTitle>
              <CardDescription>
                Your current medication schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activePrescriptions.length > 0 ? (
                activePrescriptions.map((prescription) => (
                  <div key={prescription.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{prescription.medicineName}</h4>
                      <p className="text-sm text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <TrendingUp className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Until {new Date(prescription.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Active
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No active prescriptions</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900">Book Appointment</h3>
                <p className="text-sm text-gray-600">Schedule your next medical visit</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Pill className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="font-medium text-gray-900">Add Prescription</h3>
                <p className="text-sm text-gray-600">Track new medication</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <Heart className="h-8 w-8 text-red-600 mb-2" />
                <h3 className="font-medium text-gray-900">Health Records</h3>
                <p className="text-sm text-gray-600">View your medical history</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
