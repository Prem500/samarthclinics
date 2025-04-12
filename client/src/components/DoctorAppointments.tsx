import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarIcon,
  Phone,
  Mail,
  Clock,
  Filter,
  FileEdit,
  Trash2,
  User,
  AlertCircle,
} from "lucide-react";
import { format, isToday, isTomorrow, parseISO, isAfter } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Type definitions that match server responses
interface UserDetails {
  _id: string;
  email: string;
  phoneNumber?: string;
  full_name: string;
}

interface Booking {
  _id: string;
  doctor: string;
  date: string;
  time: string;
  user: UserDetails; // This is now an object, not just an ID
  issue: string;
  status: "scheduled" | "completed" | "cancelled" | "pending" | "confirmed";
  createdAt: string;
  updatedAt: string;
}

const DoctorAppointments = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const { userId } = useAuth();
  const isLoaded = true; // Since our authentication state is immediately available

  const doctorId = userId;

  useEffect(() => {
    if (isLoaded && doctorId) {
      fetchBookings();
    }
  }, [doctorId, isLoaded]);

  useEffect(() => {
    filterBookings();
  }, [bookings, activeTab, searchTerm, dateFilter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      // First, get the doctor's MongoDB ID from the custom AuthContext ID
      const doctorResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const doctorMongoId = doctorResponse.data._id;

      if (!doctorMongoId) {
        throw new Error("Could not retrieve doctor information");
      }

      // Now use the MongoDB ID to fetch bookings with populated user data
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/booking/${doctorMongoId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Validate that we received proper booking data
      const data = response.data;

      if (!Array.isArray(data)) {
        throw new Error("Received invalid booking data format");
      }

      // Verify each booking has the user property as an object
      const validatedBookings = data.map((booking: any) => {
        // Ensure booking.user is an object with required properties
        if (!booking.user || typeof booking.user !== "object") {
          console.warn(
            `Booking ${booking._id} has missing user data, using placeholder`
          );
          // Provide a placeholder user object to avoid null references
          booking.user = {
            _id: "unknown",
            full_name: "Unknown Patient",
            email: "no-email@placeholder.com",
            phoneNumber: "N/A",
          };
        }
        return booking;
      });

      setBookings(validatedBookings);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      setError(error.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    if (!bookings.length) {
      setFilteredBookings([]);
      return;
    }

    let filtered = [...bookings];

    if (activeTab === "today") {
      filtered = filtered.filter((booking) => isToday(parseISO(booking.date)));
    } else if (activeTab === "upcoming") {
      filtered = filtered.filter(
        (booking) =>
          isAfter(parseISO(booking.date), new Date()) &&
          !isToday(parseISO(booking.date))
      );
    } else if (activeTab === "completed") {
      filtered = filtered.filter(
        (booking) =>
          booking.status === "completed" || booking.status === "confirmed"
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((booking) => {
        // Now user is an object with properties directly accessible
        return (
          booking.user?.full_name?.toLowerCase().includes(term) ||
          booking.user?.phoneNumber?.includes(term) ||
          booking.user?.email?.toLowerCase().includes(term) ||
          booking.issue?.toLowerCase().includes(term)
        );
      });
    }

    if (dateFilter) {
      const filterDate = format(dateFilter, "yyyy-MM-dd");
      filtered = filtered.filter((booking) => booking.date === filterDate);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    setFilteredBookings(filtered);
  };

  const handleUpdateBooking = async (updatedBooking: Booking) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL.replace(
          "/api",
          ""
        )}/api/booking/update/${updatedBooking._id}`,
        updatedBooking
      );

      if (response.data) {
        setBookings(
          bookings.map((booking) =>
            booking._id === updatedBooking._id ? response.data : booking
          )
        );
        setIsEditDialogOpen(false);
      }
    } catch (error: any) {
      console.error("Error updating booking:", error);
      alert(`Failed to update: ${error.message}`);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL.replace(
          "/api",
          ""
        )}/api/booking/delete/${id}`
      );
      setBookings(bookings.filter((booking) => booking._id !== id));
      setIsConfirmDialogOpen(false);
    } catch (error: any) {
      console.error("Error deleting booking:", error);
      alert(`Failed to delete: ${error.message}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
      case "pending":
        return <Badge className="bg-blue-500">Pending</Badge>;
      case "completed":
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>Pending</Badge>;
    }
  };

  const getDateLabel = (dateStr: string) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "PPP");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Doctor Appointments Dashboard</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "2.25rem" }}
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={dateFilter}
                onSelect={(date) => setDateFilter(date)}
                initialFocus
              />
              {dateFilter && (
                <div className="p-2 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDateFilter(undefined)}
                    className="w-full"
                  >
                    Clear filter
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <p>Loading appointments...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No appointments found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <>
                  <TableRow key={booking._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="bg-slate-100 p-2 rounded-full">
                          <User className="h-4 w-4" />
                        </div>
                        {booking.user?.full_name || "Unknown Patient"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="flex items-center">
                          <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                          {getDateLabel(booking.date)}
                        </span>
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {booking.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center text-sm">
                          <Phone className="mr-1 h-3 w-3 text-muted-foreground" />
                          {booking.user?.phoneNumber || "N/A"}
                        </span>
                        <span className="flex items-center text-sm">
                          <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                          {booking.user?.email || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={booking.issue}>
                        {booking.issue?.substring(0, 50) || "No description"}
                        {booking.issue?.length > 50 ? "..." : ""}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setIsConfirmDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>
              Update the appointment details
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <Label>Patient Name</Label>
                <Input
                  value={selectedBooking.user?.full_name || "Unknown Patient"}
                  disabled
                />
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  value={selectedBooking.status}
                  onValueChange={(value) =>
                    setSelectedBooking({
                      ...selectedBooking,
                      status: value as any,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Notes about patient issue</Label>
                <textarea
                  className="w-full min-h-[80px] p-2 border rounded-md"
                  value={selectedBooking.issue}
                  onChange={(e) =>
                    setSelectedBooking({
                      ...selectedBooking,
                      issue: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                selectedBooking && handleUpdateBooking(selectedBooking)
              }
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mx-auto w-full">
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="text-red-500 bg-gray-100"
              onClick={() =>
                selectedBooking && handleDeleteBooking(selectedBooking._id)
              }
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorAppointments;
