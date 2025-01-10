import { useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import { Add, Edit, Visibility } from '@mui/icons-material';
import toast from 'react-hot-toast';

const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    totalDimensions: '30x20x15',
    totalWeight: 2.5,
    status: 'pending',
    packages: [
      { id: 'PKG-001', length: 30, width: 20, height: 15, weight: 2.5 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    totalDimensions: '25x15x10',
    totalWeight: 1.8,
    status: 'ready',
    packages: [
      { id: 'PKG-002', length: 25, width: 15, height: 10, weight: 1.8 }
    ]
  }
];

export default function PackagingManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [packageListOpen, setPackageListOpen] = useState(false);
  const [editPackageOpen, setEditPackageOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [addPackageOpen, setAddPackageOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    length: '',
    width: '',
    height: '',
    weight: ''
  });

  const handleViewPackages = (order) => {
    setSelectedOrder(order);
    setPackageListOpen(true);
  };

  const handleEditPackage = (pkg) => {
    setSelectedPackage(pkg);
    setNewPackage({
      length: pkg.length,
      width: pkg.width,
      height: pkg.height,
      weight: pkg.weight
    });
    setEditPackageOpen(true);
  };

  const handleUpdatePackage = () => {
    toast.success('Package dimensions updated successfully');
    setEditPackageOpen(false);
  };

  const handleAddPackage = () => {
    setAddPackageOpen(true);
  };

  const handleSaveNewPackage = () => {
    toast.success('New package added successfully');
    setAddPackageOpen(false);
    setNewPackage({ length: '', width: '', height: '', weight: '' });
  };

  return (
    <>
      <Card>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">Package Management</Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddPackage}
            >
              Add Package
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Dimensions (cm)</TableCell>
                  <TableCell>Weight (kg)</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.totalDimensions}</TableCell>
                    <TableCell>{order.totalWeight}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status.toUpperCase()}
                        color={order.status === 'ready' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewPackages(order)}
                      >
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>

      {/* Package List Modal */}
      <Dialog
        open={packageListOpen}
        onClose={() => setPackageListOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Packages for Order {selectedOrder?.id}
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Package ID</TableCell>
                  <TableCell>Length (cm)</TableCell>
                  <TableCell>Width (cm)</TableCell>
                  <TableCell>Height (cm)</TableCell>
                  <TableCell>Weight (kg)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder?.packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{pkg.id}</TableCell>
                    <TableCell>{pkg.length}</TableCell>
                    <TableCell>{pkg.width}</TableCell>
                    <TableCell>{pkg.height}</TableCell>
                    <TableCell>{pkg.weight}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditPackage(pkg)}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPackageListOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Package Modal */}
      <Dialog
        open={editPackageOpen}
        onClose={() => setEditPackageOpen(false)}
      >
        <DialogTitle>Edit Package Dimensions</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                label="Length (cm)"
                type="number"
                value={newPackage.length}
                onChange={(e) => setNewPackage({ ...newPackage, length: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Width (cm)"
                type="number"
                value={newPackage.width}
                onChange={(e) => setNewPackage({ ...newPackage, width: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Height (cm)"
                type="number"
                value={newPackage.height}
                onChange={(e) => setNewPackage({ ...newPackage, height: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Weight (kg)"
                type="number"
                value={newPackage.weight}
                onChange={(e) => setNewPackage({ ...newPackage, weight: e.target.value })}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPackageOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdatePackage}>
            Update Package
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Package Modal */}
      <Dialog
        open={addPackageOpen}
        onClose={() => setAddPackageOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Package</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                label="Select Order"
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select an order</option>
                {mockOrders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.id} - {order.customerName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Length (cm)"
                type="number"
                value={newPackage.length}
                onChange={(e) => setNewPackage({ ...newPackage, length: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Width (cm)"
                type="number"
                value={newPackage.width}
                onChange={(e) => setNewPackage({ ...newPackage, width: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Height (cm)"
                type="number"
                value={newPackage.height}
                onChange={(e) => setNewPackage({ ...newPackage, height: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Weight (kg)"
                type="number"
                value={newPackage.weight}
                onChange={(e) => setNewPackage({ ...newPackage, weight: e.target.value })}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddPackageOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveNewPackage}>
            Add Package
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}